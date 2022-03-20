import { User } from '@shopping/entities';
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../user/user.db-repository';
import { JwtService } from '@nestjs/jwt';
import { IBaseJWTPayload } from '@shopping/interfaces';
import { UserAuthCredentialsDto } from './dto/user-auth.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserAuthService {
  private logger = new Logger(UserAuthService.name);

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async signIn(authCredentialsDto: UserAuthCredentialsDto): Promise<IBaseJWTPayload> {
    const user = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: Partial<IBaseJWTPayload> = user;
    const accessToken = await this.jwtService.signAsync(payload);

    this.logger.debug(`Generated JWT Token for Agent with payload ${JSON.stringify(payload)}`);

    const { email, id, firstName, lastName } = await this.userRepository.findOne(
      {
        id: user.id
      },
      {
        select: ['email', 'id', 'accessToken', 'firstName', 'lastName']
      }
    );

    await this.userRepository.update(user.id, { accessToken });

    return { accessToken, email, id, firstName, lastName };
  }

  async forgotPassword(email: string) {
    const targetAgent = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'firstName', 'lastName', 'email', 'language']
    });

    if (!targetAgent) {
      throw new BadRequestException('No agent found for target email');
    }

    //Get access token using agent id..
    const accessToken = this.createAgentPasswordResetToken(targetAgent.id);

    //Send forgot password email..
    // await this.emailTemplateService.sendForgotAgentPasswordEmail(accessToken.token, targetAgent);

    return {
      message: 'Password reset email sent',
      accessToken
    };
  }

  createAgentPasswordResetToken(agentId: string) {
    const payload = {
      agentId
    };
    const token = jwt.sign(payload, this.configService.get('JWT_SECRET'), {
      expiresIn: this.configService.get('JWT_EXPIRES_IN')
    });

    return { ...payload, token };
  }
}
