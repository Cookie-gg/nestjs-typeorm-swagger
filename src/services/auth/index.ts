import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '~/domain/models/auth';
import { User } from '~/domain/models/user';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: User): Promise<Auth> {
    const payload = { uid: user.uid, email: user.email };
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
