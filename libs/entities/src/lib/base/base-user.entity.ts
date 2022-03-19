import { Column, Index } from 'typeorm';
import bcrypt = require('bcrypt');
import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ELanguage } from '@shopping/enums';
import { PASSWORD_STRENGTH_REGEX } from '@shopping/service-libs';

export abstract class BaseUser extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  @IsString()
  firstName: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  @IsString()
  lastName: string;

  @ApiProperty()
  @Column({ type: 'text', unique: true })
  @IsEmail()
  @Index()
  email: string;

  // @Column()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(PASSWORD_STRENGTH_REGEX, {
    message: 'Password too weak'
  })
  password?: string;

  @Column('timestamptz', { nullable: true })
  lastPasswordChange?: Date;

  @ApiProperty({
    enum: ELanguage
  })
  @IsEnum(ELanguage)
  @Column({ type: 'text', nullable: false, default: ELanguage.English })
  language: ELanguage;

  @Column({ type: 'text', nullable: true })
  accessToken: string;

  @Column({ type: 'text', nullable: true })
  registrationIp: string;
}
