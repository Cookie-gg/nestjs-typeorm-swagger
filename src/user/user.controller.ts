import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserInput, User } from '../entities/user';

@ApiTags('user')
@Controller('user')
export class UserController {
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ type: User })
  createUser(@Body() body: CreateUserInput): User {
    return body;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: [User] })
  getAllUsers(): User[] {
    return [];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  getUser(@Param() params: { id?: string }): string {
    return params.id;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  deleteUser(@Param() params: { id?: string }): string {
    return params.id;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id' })
  updateUser(@Body() body: CreateUserInput): User {
    return body;
  }
}
