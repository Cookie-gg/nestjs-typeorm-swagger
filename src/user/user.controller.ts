import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserInput, User } from './user.model';

@ApiTags('user')
@Controller('user')
export class UserController {
  @Post('create')
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() body: CreateUserInput): User {
    return body;
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  getAllUsers(): User[] {
    return [];
  }
}
