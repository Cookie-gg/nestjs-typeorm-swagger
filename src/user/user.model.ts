import { ApiProperty } from '@nestjs/swagger';
import { IsLowercase, IsString, MinLength } from 'class-validator';

export class User {
  @ApiProperty({
    example: 'your name',
    description: 'your name',
    required: true,
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 'user_id',
    description: 'the id for loging',
    required: true,
    type: String,
  })
  uid: string;

  @ApiProperty({
    example: 'your password',
    description: 'your password',
    required: true,
    type: String,
  })
  password: string;
}

export class CreateUserInput extends User {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @IsLowercase()
  @MinLength(4)
  uid: string;

  @IsString()
  @IsLowercase()
  @MinLength(8)
  password: string;
}
