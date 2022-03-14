import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { crudGeneralOptions } from '@shopping/service-libs';
import { User } from '@shopping/entities';

@Crud({
  model: {
    type: User,
  },
  ...crudGeneralOptions,
  query: {
    ...crudGeneralOptions.query,
    maxLimit: 500,
  },
})
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public readonly service: UserService) {}
}
