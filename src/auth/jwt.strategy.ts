import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UserService,
    private configService: ConfigService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');

    console.log('SecretOrKey:', secret);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: { email: any }) {
    return this.usersService.findOneByEmail(payload.email);
  }
}
