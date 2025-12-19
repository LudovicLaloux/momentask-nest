import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LogInDto } from './dto/logIn.dto';
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
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user.id });
    return { token, user: { id: user.id, email: user.email } };
  }

  async logIn(
    logInDto: LogInDto,
  ): Promise<{ token: string; user: { id: string; email: string } }> {
    const user = await this.usersService.findByEmail(logInDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(
      logInDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ id: user.id });
    return { token, user: { id: user.id, email: user.email } };
  }

  async checkEmail(checkEmailDto: CheckEmailDto): Promise<{ exists: boolean }> {
    const user = await this.usersService.findByEmail(checkEmailDto.email);
    return { exists: !!user };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    // TODO: Implement a logger
    // For security, don't reveal if the email exists or not
    if (!user) {
      return;
    }

    // Generate a reset token
    const resetToken = require('crypto').randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Save the token in the database
    await this.usersService.updateResetPasswordToken(
      user.id,
      resetToken,
      resetTokenExpiry,
    );

    // In dev mode, display the link in the console
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    console.log('\n🔐 PASSWORD RESET LINK for', email);
    console.log('   Link:', resetLink);
    console.log('   Expires in: 1 hour\n');

    // TODO: later, send email here
    // await this.emailService.sendPasswordResetEmail(user.email, resetLink);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Find the user by the token
    const user = await this.usersService.findByResetPasswordToken(token);

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Verify if the token has expired
    if (!user.resetPasswordExpiry || user.resetPasswordExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    await this.usersService.updatePassword(user.id, hashedPassword);

    // Clear the reset token
    await this.usersService.clearResetPasswordToken(user.id);
  }
}
