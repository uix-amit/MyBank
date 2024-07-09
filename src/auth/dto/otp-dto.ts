import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class OtpDto {
  @ApiProperty({ type: Number, example: 123456 })
  @IsDefined()
  @IsNumber()
  otp!: number;

  @ApiProperty({ type: String, example: 'clyer1smc0000z0elhfljexma' })
  @IsDefined()
  @IsString()
  id!: string;
}
