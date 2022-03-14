import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@shopping/admin-modules';
import { configurationSchema } from './config.schema';
import { configs } from '@shopping/service-libs';
import { User } from '@shopping/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      validationSchema: configurationSchema
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
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
