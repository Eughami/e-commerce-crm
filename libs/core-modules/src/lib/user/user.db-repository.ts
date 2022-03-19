import { Repository, EntityRepository } from 'typeorm';
import { Logger } from '@nestjs/common';
import bcrypt = require('bcrypt');
import { User } from '@shopping/entities';
import { IBaseJWTPayload } from '@shopping/interfaces';
import { UserAuthCredentialsDto } from '../auth/user/user-auth.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger(UserRepository.name);

  async validateUserPassword(authCredentialsDto: UserAuthCredentialsDto): Promise<IBaseJWTPayload> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({
      where: { email },
      select: ['email', 'id', 'password']
    });

    if (user && user.validatePassword(password)) {
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id
      };
    } else {
      return null;
    }
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
