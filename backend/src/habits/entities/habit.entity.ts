import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Habit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
