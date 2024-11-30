import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  @Get('protected')
  @UseGuards(RolesGuard)
  protectedRoute() {
    return { message: 'Access granted to protected route!' };
  }
}