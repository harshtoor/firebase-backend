
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('assign')
  async assignRole(@Body() body: { uid: string; role: string }) {
    await this.rolesService.assignRole(body.uid, body.role);
    return { message: 'Role assigned successfully' };
  }

  @Get(':uid')
  async getRole(@Param('uid') uid: string) {
    const role = await this.rolesService.getRole(uid);
    return { uid, role };
  }
}