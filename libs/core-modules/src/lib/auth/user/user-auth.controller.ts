import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthService } from './user-auth.service';
import { User } from '@shopping/entities';
import { UserAuthCredentialsDto } from './dto/user-auth.dto';
import { IBaseJWTPayload } from '@shopping/interfaces';
import { UserForgotPasswordDto } from './dto/user-forgot-password.dto';

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

  @Post('/forgot-password')
  forgotPassword(@Body() data: UserForgotPasswordDto) {
    return this.authService.forgotPassword(data.email);
  }
}
