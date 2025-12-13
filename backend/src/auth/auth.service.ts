import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CheckEmailDto } from './dto/check-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ token: string; user: { id: string; email: string } }> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user.id });
    return { token, user: { id: user.id, email: user.email } };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string; user: { id: string; email: string } }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
    const token = this.jwtService.sign({ id: user.id });
    return { token, user: { id: user.id, email: user.email } };
  }

  async checkEmail(checkEmailDto: CheckEmailDto): Promise<{ exists: boolean }> {
    const user = await this.usersService.findByEmail(checkEmailDto.email);
    return { exists: !!user };
  }
}
