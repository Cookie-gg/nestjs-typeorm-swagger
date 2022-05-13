import { User } from '../user';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class Auth {
  @ApiProperty({
    description: 'The token of authentication availables for 2 hours',
    readOnly: true,
    required: true,
    type: String,
  })
  token: string;

  @ApiProperty({
    description: 'The refreshtoken of authentication availables for 2 weeks',
    readOnly: true,
    required: true,
    type: String,
  })
  refreshToken: string;

  @ApiProperty({
    readOnly: true,
    required: true,
    type: User,
  })
  user: User;
}

export class LoginAuthInput {
  @ApiProperty({
    description: 'Uid and email are unique value',
    required: true,
    type: String,
  })
  @IsString()
  uniqueInfo: string;

  @ApiProperty({
    description: 'The password of the user',
    required: true,
    type: String,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
