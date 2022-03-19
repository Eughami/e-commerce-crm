import { User } from '@shopping/entities';
import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../user/user.db-repository';

@Injectable()
export class UserAuthService {
  private logger = new Logger(UserAuthService.name);

  constructor(private userRepository: UserRepository) {}

  register(user: User) {
    return this.userRepository.save(user);
  }
}
