import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { RequiredPicks } from '~/types/addons';
import { User } from '../entities/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(data: RequiredPicks<User>): Promise<User> {
    data.password = await bcrypt.hash(data.password, 10);
    return this.userRepository.save(data);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async find(uniqueData: string): Promise<User> {
    return this.userRepository.findOne(this.validateUniqueData(uniqueData));
  }

  async update(uniqueData: string, updates: RequiredPicks<User>): Promise<UpdateResult> {
    return this.userRepository.update(this.validateUniqueData(uniqueData), updates);
  }

  async delete(uniqueData: string): Promise<DeleteResult> {
    return this.userRepository.delete(this.validateUniqueData(uniqueData));
  }

  validateUniqueData(uniqueData: string): Partial<User> {
    return isEmail(uniqueData) ? { email: uniqueData } : { uid: uniqueData };
  }
}
