import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModulesModule } from '@shopping/admin-modules';
import { configurationSchema } from './config.schema';
import { configs } from '@shopping/service-libs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.development`],
      validationSchema: configurationSchema,
    }),
    AdminModulesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configs(configService),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
