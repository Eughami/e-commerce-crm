import { Controller, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from '@shopping/entities';
import { crudGeneralOptions } from '@shopping/service-libs';
import { UsersService } from './users.service';

@Crud({
  ...crudGeneralOptions,
  model: {
    type: User
  },
  routes: {
    exclude: ['replaceOneBase']
  },
  query: {
    ...crudGeneralOptions.query,
    maxLimit: 500,
    join: {
      ...crudGeneralOptions.query.join
    }
  }
})
// @ApiBearerAuth()
// Add interceptors here
@ApiTags('Users')
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public readonly service: UsersService) {}
}
