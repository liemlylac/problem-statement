import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { KeycloakService } from '../keycloak/keycloak.service';
import { LoginRequestDTO, LoginResultDTO } from './dto/login.dto';
import { RefreshTokenDTO, RefreshTokenResultDTO } from './dto/refresh-token.dto';

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
    } catch (error) {
      Logger.error(error);
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        throw new UnauthorizedException(error.response.data)
      }
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({
    summary: 'Refresh new access token',
    description: 'Using refresh token from login api to get new access token',
  })
  @ApiOkResponse({ type: RefreshTokenResultDTO })
  @Public()
  @Post('refresh-token')
  async refreshToken(@Body() form: RefreshTokenDTO): Promise<RefreshTokenResultDTO> {
    try {
      const { data } = await this.keycloakService.refreshToken(form);
      return {
        accessToken: data.access_token,
        expiresIn: data.expires_in,
        refreshToken: data.refresh_token,
        tokenType: data.token_type,
      };
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
