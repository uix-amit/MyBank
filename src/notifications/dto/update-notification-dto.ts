import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateNotificationDto {
  @ApiProperty({
    type: String,
    example: '6955b3b0-a3ea-4743-810a-adcaa9d8e527',
  })
  @IsDefined()
  @IsString()
  NotificationID!: string;

  @ApiProperty({
    type: String,
    example: '98ef3ec0-9f87-442e-8859-50150b8b485c',
  })
  @IsDefined()
  @IsString()
  UserID!: string;

  @ApiPropertyOptional({
    type: String,
    example:
      'Dear John, your salary of 50,000$ has been credited to your account on 01/03/2023.',
  })
  @IsOptional()
  @IsString()
  Message!: string;

  @ApiPropertyOptional({ type: Boolean, example: false })
  @IsOptional()
  @IsBoolean()
  IsRead?: boolean;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  CreatedAt?: Date;
}
