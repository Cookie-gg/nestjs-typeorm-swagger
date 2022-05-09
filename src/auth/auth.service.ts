import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '~/entities/auth';
import { User } from '~/entities/user';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: User): Promise<Auth> {
    const payload = { id: user.id, uid: user.uid, email: user.email };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '2h',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn: '14d',
    });
    return { user, token, refreshToken };
  }
}
