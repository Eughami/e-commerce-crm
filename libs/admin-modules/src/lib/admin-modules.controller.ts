import { Controller, Get } from '@nestjs/common';
import { AdminModulesService } from './admin-modules.service';

@Controller('admin-modules')
export class AdminModulesController {
  constructor(private adminModulesService: AdminModulesService) {}

  @Get()
  getData(): { message: string } {
    return { message: 'Welcome to admin-modules!' };
  }
}
