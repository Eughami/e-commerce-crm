import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthModule, UserRepository } from '@shopping/core-modules';
import { User } from '@shopping/entities';

@Module({
  imports: [UserAuthModule, TypeOrmModule.forFeature([UserRepository, User])],
  controllers: [],
  providers: [],
  exports: []
})
export class ClientModulesModule {}
