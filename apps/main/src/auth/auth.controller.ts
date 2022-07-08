import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Logger, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { KeycloakService } from '../keycloak/keycloak.service';
import { LoginRequestDTO, LoginResultDTO } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly keycloakService: KeycloakService,
  ) {
  }

  @ApiOperation({
    summary: 'Login method to get access token',
    description: 'Call this API first to get accessToken which will use later',
  })
  @ApiOkResponse({ type: LoginResultDTO })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginForm: LoginRequestDTO): Promise<LoginResultDTO> {
    try {
      const { data } = await this.keycloakService.login(loginForm);
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
        tokenType: data.token_type,
      }
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
