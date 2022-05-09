import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, LoginInputs } from '~/entities/auth';
import { User } from '~/entities/user';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginInputs })
  @ApiResponse({ type: Auth })
  @UseGuards(AuthGuard('local'))
  login(inputs: LoginInputs, @Req() req?: { user: User }) {
    return this.authService.login(req.user);
  }

  @Post('/status')
  @ApiOperation({ summary: 'Check logging status' })
  @ApiHeader({ name: 'authorization', description: 'must be started with "bearer"' })
  @ApiResponse({ type: Auth })
  @UseGuards(AuthGuard('jwt'))
  status(@Req() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @Post('/refresh')
  @ApiHeader({ name: 'authorization', description: 'must be started with "bearer"' })
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ type: Auth })
  @UseGuards(AuthGuard('jwt-refresh'))
  refresh(@Req() req: { user: User }) {
    return this.authService.login(req.user);
  }
}
