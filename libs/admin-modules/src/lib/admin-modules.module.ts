import { Module } from '@nestjs/common';
import { AdminModulesController } from './admin-modules.controller';
import { AdminModulesService } from './admin-modules.service';

@Module({
  controllers: [AdminModulesController],
  providers: [AdminModulesService],
  exports: [AdminModulesService],
})
export class AdminModulesModule {}
