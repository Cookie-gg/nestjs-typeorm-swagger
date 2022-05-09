import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLowercase, IsString, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @ApiProperty({
    description: 'The id of user',
    required: true,
    type: String,
  })
  @Column({ unique: true, nullable: false })
  @IsString()
  @MinLength(4)
  @IsLowercase()
  uid: string;

  @ApiProperty({
    description: 'Your name',
    required: true,
    type: String,
  })
  @Column({ nullable: false })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Your name',
    required: true,
    type: String,
  })
  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Your password',
    required: true,
    type: String,
  })
  @Column({ nullable: false })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Is Your account published?',
    required: false,
    type: Boolean,
  })
  @Column({ default: false, nullable: true })
  published?: boolean;

  @ApiProperty({
    description: 'The date which the user was created',
    readOnly: true,
    required: false,
    type: Date,
  })
  @Index('createdAt-idx')
  @CreateDateColumn({ nullable: true })
  readonly createdAt?: string;

  @ApiProperty({
    description: 'The date which the user was updated',
    readOnly: true,
    required: false,
    type: Date,
  })
  @UpdateDateColumn({ nullable: true })
  readonly updatedAt?: string;
}
