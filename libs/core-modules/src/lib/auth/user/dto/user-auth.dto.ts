import { PASSWORD_STRENGTH_REGEX } from '@shopping/service-libs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';

export class UserAuthCredentialsDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(PASSWORD_STRENGTH_REGEX, {
    message: 'Password too weak'
  })
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
