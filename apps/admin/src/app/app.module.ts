import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AdminModulesModule } from '@shopping/admin-modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
