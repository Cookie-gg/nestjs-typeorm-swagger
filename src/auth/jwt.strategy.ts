import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '~/entities/user';
import { RequiredPicks } from '~/types/addons';
import { UserService } from '~/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: RequiredPicks<User>): Promise<User> {
    const user = await this.userService.find(payload.uid);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
