import { Controller, Get, HttpStatus, NotFoundException, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  @Public()
  @Get()
  redirect(@Res() res) {
    if (this.configService.get('NODE_ENV') !== 'production') {
      return res.redirect(HttpStatus.PERMANENT_REDIRECT, '/api');
    }
    throw new NotFoundException();
  }
}
