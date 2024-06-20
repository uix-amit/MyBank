import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTwoFactorAuthDto {
  @ApiProperty({
    type: String,
    example: '615d6b5d-4d13-468b-b8a6-05c10a0eab4d',
  })
  @IsDefined()
  @IsString()
  TwoFactorAuthID!: string;

  @ApiProperty({
    type: String,
    example: '82158c84-38b9-47e9-9722-3f8e26f9ae42',
  })
  @IsDefined()
  @IsString()
  UserID!: string;

  @ApiPropertyOptional({ type: Number, example: 123123 })
  @IsOptional()
  @IsNumber()
  Otp!: number;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  CreatedAt?: Date;
}
