import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateTwoFactorAuthDto {
  @ApiProperty({
    type: String,
    example: '82158c84-38b9-47e9-9722-3f8e26f9ae42',
  })
  @IsDefined()
  @IsString()
  UserID!: string;

  @ApiProperty({ type: Number, example: 123123 })
  @IsDefined()
  @IsString()
  Otp!: number;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  CreatedAt?: Date;
}
