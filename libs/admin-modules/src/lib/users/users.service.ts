import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtendedCrudService } from '@shopping/service-libs';
import { User } from '@shopping/entities';

@Injectable()
export class UsersService extends ExtendedCrudService<User> {
  constructor(@InjectRepository(User) public repo: Repository<User>) {
    super(repo, true);
  }
}
