import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      birthdate: user.birthdate,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
