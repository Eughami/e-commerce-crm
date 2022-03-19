import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthService } from './user-auth.service';
import { User } from '@shopping/entities';

@Controller('user-auth')
@ApiTags('User Auth')
export class UserAuthController {
  constructor(private authService: UserAuthService) {}

  @Post('/register')
  register(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }
}
