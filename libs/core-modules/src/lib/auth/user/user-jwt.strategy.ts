import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '@shopping/entities';
import { IsNull, Not, Repository } from 'typeorm';
import { IBaseJWTPayload } from '@shopping/interfaces';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret')
    });
  }

  async validate(payload: IBaseJWTPayload): Promise<IBaseJWTPayload> {
    const { firstName, lastName, email } = payload;

    const user = await this.userRepo.findOne({
      where: { email, accessToken: Not(IsNull()) }
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const { id } = user;

    return {
      firstName,
      lastName,
      email,
      id
    };
  }
}
