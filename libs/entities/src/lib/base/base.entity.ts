import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column('text', { nullable: true, default: 'System' })
  createdBy?: string;

  @Column('text', { nullable: true })
  updatedBy?: string;

  @Column('text', { nullable: true })
  deletedBy?: string;

  isDeleted() {
    return !!this.deletedAt;
  }
}
