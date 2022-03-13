import { Module } from '@nestjs/common';
import { CoreModulesModule } from '@shopping/core-modules';

@Module({
  imports: [CoreModulesModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ClientModulesModule {}
