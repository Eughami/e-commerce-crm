import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configurationSchema } from './config.schema';
import { ClientModulesModule } from '@shopping/client-modules';
import { configs } from '@shopping/service-libs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      validationSchema: configurationSchema
    }),
    ClientModulesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configs(configService)
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
