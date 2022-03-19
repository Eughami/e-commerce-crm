import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
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

  // validatePassword(password: string): boolean {
  //   const hash = bcrypt.hashSync(password, this.passwordSalt);
  //   console.log(hash, this.passwordSalt, this.password, hash === this.password);
  //   return hash === this.password;
  // }

  validatePassword(password: string): boolean {
    console.log(password, this.password, bcrypt.compareSync(password, this.password));
    return bcrypt.compareSync(password, this.password);
  }
}
