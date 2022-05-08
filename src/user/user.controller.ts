import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequiredPicks } from '~/types/addons';
import { User } from '../entities/user';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: User })
  @ApiResponse({ type: User })
  async createUser(@Body() body: RequiredPicks<User>): Promise<User> {
    return await this.userService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: [User] })
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by unique data' })
  async getUser(@Param() params: { id?: string }) {
    return await this.userService.find(params.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by unique data' })
  async deleteUser(@Param() params: { id?: string }) {
    return await this.userService.delete(params.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by unique data' })
  @ApiBody({ type: User })
  @ApiResponse({ type: User })
  async updateUser(@Param() params: { id?: string }, @Body() body: RequiredPicks<User>) {
    return await this.userService.update(params.id, body);
  }
}
