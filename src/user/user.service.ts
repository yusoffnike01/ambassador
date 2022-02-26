import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async save(Options) {
    return await this.userRepository.save(Options);
  }

  async find(Options) {
    return await this.userRepository.find(Options);
  }
  async findOne(Options) {
    return await this.userRepository.findOne(Options);
  }
  async update(id: number, Options) {
    return await this.userRepository.update(id, Options);
  }
}
