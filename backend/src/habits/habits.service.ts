import { Injectable } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habit } from './entities/habit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
  ) {}

  create(createHabitDto: CreateHabitDto) {
    return this.habitRepository.save(createHabitDto);
  }

  findAll() {
    return this.habitRepository.find();
  }

  findOne(id: number) {
    return this.habitRepository.findOne({ where: { id } });
  }

  update(id: number, updateHabitDto: UpdateHabitDto) {
    return this.habitRepository.update(id, updateHabitDto);
  }

  remove(id: number) {
    return this.habitRepository.delete(id);
  }
}
