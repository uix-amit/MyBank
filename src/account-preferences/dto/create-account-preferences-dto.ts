import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAccountPreferencesDto {
  @ApiProperty({
    type: String,
    example: 'c7ac2c51-7768-442d-83fe-c9bac1257013',
  })
  @IsDefined()
  @IsString()
  UserID: string;

  @ApiPropertyOptional({ type: Boolean, example: true })
  @IsOptional()
  @IsBoolean()
  EmailNotifications?: boolean = true;

  @ApiPropertyOptional({ type: Boolean, example: true })
  @IsOptional()
  @IsBoolean()
  SMSNotifications?: boolean = true;

  @ApiPropertyOptional({ type: Boolean, example: true })
  @IsOptional()
  @IsBoolean()
  PushNotifications?: boolean = true;

  @ApiPropertyOptional({ type: Boolean, example: true })
  @IsOptional()
  @IsBoolean()
  EnableTwoFactorAuth: boolean = true;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  CreatedAt?: Date;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  UpdatedAt?: Date;
}