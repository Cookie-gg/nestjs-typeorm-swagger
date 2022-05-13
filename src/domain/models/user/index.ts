import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'The id of user',
    required: true,
    type: String,
    minLength: 4,
  })
  uid: string;

  @ApiProperty({
    description: 'Your name',
    required: true,
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Your name',
    required: true,
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Your password',
    required: true,
    type: String,
    minLength: 8,
  })
  password: string;

  @ApiProperty({
    description: 'Is Your account published?',
    required: false,
    type: Boolean,
  })
  published?: boolean;

  @ApiProperty({
    description: 'The date which the user was created',
    readOnly: true,
    required: false,
    type: Date,
  })
  readonly createdAt?: string;

  @ApiProperty({
    description: 'The date which the user was updated',
    readOnly: true,
    required: false,
    type: Date,
  })
  readonly updatedAt?: string;
}

export class CreateUserInput extends User {}
