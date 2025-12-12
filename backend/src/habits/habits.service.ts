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
    const habit = this.habitRepository.create(createHabitDto);
    return this.habitRepository.save(habit);
  }

  findAll() {
    return this.habitRepository.find();
  }

  findOne(id: string) {
    return this.habitRepository.findOne({ where: { id } });
  }

  update(id: string, updateHabitDto: UpdateHabitDto) {
    return this.habitRepository.update(id, updateHabitDto);
  }

  remove(id: string) {
    return this.habitRepository.delete(id);
  }
}
