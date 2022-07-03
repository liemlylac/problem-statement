import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticatedUser, Public, Roles, Unprotected } from 'nest-keycloak-connect';
import { KeycloakService } from './keycloak.service';

@Controller('kc')
export class KeycloakController {
  constructor(
    private readonly service: KeycloakService,
  ) {
  }

  @Post('login')
  @Public() //@Unprotected alias
  async login(@Body() login) {
    const response: any = await this.service.login(login);
    return response.data;
  }

  @Get('public')
  @Unprotected()
  getPublic() {
    return 'public-api';
  }

  @Get('user')
  @Roles({ roles: ['User'] })
  getUser(@AuthenticatedUser() user) {
    return user;
  }

  @Get('admin')
  @Roles({ roles: ['Admin'] })
  getAdmin(@AuthenticatedUser() admin) {
    return admin;
  }
}