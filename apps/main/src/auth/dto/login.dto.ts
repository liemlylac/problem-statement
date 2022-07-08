import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({ example: 'user1' })
  @Length(4, 255)
  @IsString()
  username: string;

  @ApiProperty({ example: '123123' })
  @Length(4, 125)
  @IsString()
  password: string;
}

export class LoginResultDTO {
  @ApiProperty({
    example: 'Bearer',
  })
  tokenType: string;

  @ApiProperty({
    example: 300,
  })
  expiresIn: number;

  @ApiProperty({
    example: 'eyJxxxx.eyJxxxx.xxxx',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJxxxx.eyJxxxx.xxxx',
  })
  refreshToken: string;
}
