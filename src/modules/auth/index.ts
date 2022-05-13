import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user';
import { AuthController } from '~/controllers/auth';
import { AuthService } from '~/services';
import { JwtStrategy, JwtRefreshStrategy, LocalStrategy } from '~/strategies';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
