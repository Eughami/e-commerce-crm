import { Controller } from '@nestjs/common';
import { AdminModulesService } from './admin-modules.service';

@Controller('admin-modules')
export class AdminModulesController {
  constructor(private adminModulesService: AdminModulesService) {}
}
