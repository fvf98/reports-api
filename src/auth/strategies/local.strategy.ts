import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'userName', // 'username'
      passwordField: 'password', // 'passport'
    });
  }

  async validate(userName: string, password: string) {
    const user = await this.authService.validateUser(userName, password);
    if (!user)
      throw new UnauthorizedException('Login user or password does not match.');
    return user;
  }
}
