import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthService } from './user-auth.service';
import { User } from '@shopping/entities';
import bcrypt = require('bcrypt');
import { UserAuthCredentialsDto } from './user-auth.dto';
import { IBaseJWTPayload } from '@shopping/interfaces';

@Controller('user-auth')
@ApiTags('User Auth')
export class UserAuthController {
  constructor(private authService: UserAuthService) {}

  @Post('/register')
  register(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }

  @Post('/login')
  signIn(@Body() authCredentialsDto: UserAuthCredentialsDto): Promise<IBaseJWTPayload> {
    return this.authService.signIn(authCredentialsDto);
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
