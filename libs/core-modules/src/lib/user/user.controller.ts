import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { crudGeneralOptions } from '@shopping/service-libs';
import { User } from '@shopping/entities';
import { OwnGuard } from '../guards/own-guard';
import { UserJwtAuthGuard } from '..';

@Crud({
  model: {
    type: User
  },
  ...crudGeneralOptions,
  query: {
    ...crudGeneralOptions.query,
    maxLimit: 500
  },
  routes: {
    only: ['getOneBase']
  }
})
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
@CrudAuth({
  property: 'user',
  filter: (user: User) => ({
    id: user.id
  })
})
@UseGuards(UserJwtAuthGuard)
export class UserController implements CrudController<User> {
  constructor(public readonly service: UserService) {}
}
