import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from '@/habits/habits.module';
import configuration from '@/config/configuration';
import { Habit } from '@/habits/entities/habit.entity';
import { UsersModule } from '@/users/users.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: configuration().database.type as 'postgres',
      host: configuration().database.host,
      port: Number(configuration().database.port),
      username: configuration().database.username,
      password: configuration().database.password,
      database: configuration().database.database,
      entities: [Habit],
      autoLoadEntities: true,
      synchronize: true,
    }),
    HabitsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
