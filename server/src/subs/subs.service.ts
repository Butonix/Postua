/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubDto } from './dto/create-sub.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sub } from './entities/sub.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

const CATEGORIES = ['games', 'music', 'tech', 'anime', 'cinema', 'software'];

@Injectable()
export class SubsService {
  constructor(
    @InjectRepository(Sub)
    private repository: Repository<Sub>,
    private usersService: UsersService,
  ) {}

  async create(id: number, createSubDto: CreateSubDto) {
    const { category } = createSubDto;

    if (!CATEGORIES.includes(category)) {
      throw new NotFoundException('no_category');
    }

    const subscribed = await this.repository.findOne({ where: { category } });

    if (!subscribed) {
      return this.repository.save({ ...createSubDto, user: { id: id } });
    }

    return this.remove(id);
  }

  async findUserSubs(userId: number) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('no_user');
    }

    const subs = await this.repository.find({
      where: { user: { id: userId } },
    });

    return subs.map(({ user, ...rest }) => rest);
  }

  async findByUserAndCategory(userId: number, category: string) {
    const sub = await this.repository.findOne({
      where: { user: { id: userId }, category },
    });

    return !!sub;
  }

  findAll() {
    return `This action returns all subs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sub`;
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}