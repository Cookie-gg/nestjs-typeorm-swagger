import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '~/services';
import { ConfigService } from '@nestjs/config';
import { User } from '~/domain/models/user';
import { RequiredPicks } from '~/types/addons';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET_KEY,
    });
  }

  async validate(payload: RequiredPicks<User>): Promise<User> {
    const user = await this.userService.find(payload.uid);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
