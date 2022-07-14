import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class RefreshTokenDTO {
  @ApiProperty()
  @IsJWT()
  refreshToken: string;
}

export class RefreshTokenResultDTO {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  tokenType: string;
}
