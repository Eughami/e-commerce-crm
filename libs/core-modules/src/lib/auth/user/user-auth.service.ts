import { User } from '@shopping/entities';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../user/user.db-repository';
import { JwtService } from '@nestjs/jwt';
import { IBaseJWTPayload } from '@shopping/interfaces';
import { UserAuthCredentialsDto } from './user-auth.dto';

@Injectable()
export class UserAuthService {
  private logger = new Logger(UserAuthService.name);

  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  async register(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async signIn(authCredentialsDto: UserAuthCredentialsDto): Promise<IBaseJWTPayload> {
    const user = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: IBaseJWTPayload = user;
    const accessToken = await this.jwtService.signAsync(payload);

    this.logger.debug(`Generated JWT Token for Agent with payload ${JSON.stringify(payload)}`);

    const { email, id, firstName, lastName } = await this.userRepository.findOne(
      {
        id: user.id
      },
      {
        select: ['email', 'id', 'accessToken']
      }
    );

    await this.userRepository.update(user.id, { accessToken });

    return { accessToken, email, id, firstName, lastName };
  }
}
