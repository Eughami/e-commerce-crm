import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '@shopping/entities';
import { UserRepository } from '../../user/user.db-repository';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { UserJwtStrategy } from './user-jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cf: ConfigService) => ({
        secret: cf.get('JWT_SECRET'),
        signOptions: {
          expiresIn: cf.get('JWT_EXPIRES_IN')
        }
      })
    }),
    TypeOrmModule.forFeature([UserRepository, User])
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, UserJwtStrategy],
  exports: [UserAuthService, UserJwtStrategy]
})
export class UserAuthModule {}
