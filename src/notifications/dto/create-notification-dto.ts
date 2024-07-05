import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    type: String,
    example: '98ef3ec0-9f87-442e-8859-50150b8b485c',
  })
  @IsDefined()
  @IsString()
  UserID!: string;

  @ApiProperty({
    type: String,
    example:
      'Dear John, your salary of 50,000$ has been credited to your account on 01/03/2023.',
  })
  @IsDefined()
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
