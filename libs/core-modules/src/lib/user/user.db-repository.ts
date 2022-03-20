import { Repository, EntityRepository } from 'typeorm';
import { Logger } from '@nestjs/common';
import bcrypt = require('bcrypt');
import { User } from '@shopping/entities';
import { IBaseJWTPayload } from '@shopping/interfaces';
import { UserAuthCredentialsDto } from '../auth/user/dto/user-auth.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger(UserRepository.name);

  async validateUserPassword(authCredentialsDto: UserAuthCredentialsDto): Promise<Partial<IBaseJWTPayload>> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({
      where: { email },
      select: ['email', 'id', 'password', 'firstName', 'lastName', 'passwordSalt']
    });

    if (user && user.validatePassword(password)) {
      return {
        email: user.email,
        id: user.id
      };
    } else {
      return null;
    }
  }
}
