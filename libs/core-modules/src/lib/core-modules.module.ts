import { Module } from '@nestjs/common';
import { UserAuthModule } from './auth/user';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, UserAuthModule],
  controllers: [],
  providers: [],
  exports: []
})
export class CoreModulesModule {}
