import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';
import { Column, Entity, Index, Generated } from 'typeorm';
import { BaseUser } from './base/base-user.entity';
import bcrypt = require('bcrypt');

@Entity()
export class User extends BaseUser {
  @Generated('increment')
  @Column({ unique: true })
  @Index({ unique: true })
  shortId: number;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  @IsString()
  phone?: string;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ type: 'text', nullable: true })
  accountType?: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  password?: string;

  @Column({ type: 'text', nullable: true })
  passwordSalt?: string;

  @Column({ type: 'timestamptz', nullable: true })
  passwordCreatedAt: Date;

  validatePassword(password: string): boolean {
    const hash = bcrypt.hashSync(password, this.passwordSalt);
    return hash === this.password;
  }
}
