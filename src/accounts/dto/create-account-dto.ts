import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccoutStatus, Currency } from '@prisma/client';
import {
  IsDefined,
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    type: String,
    example: 'ae7a58cd-4696-4984-a954-f34b1a8af470',
  })
  @IsDefined()
  @IsString()
  UserID!: string;

  @ApiProperty({
    type: String,
    example: 'fa24327f-d930-4ecf-b024-3ce8527b2e3d',
  })
  @IsDefined()
  @IsString()
  BankID!: string;

  @ApiProperty({ type: String, example: '1234098776541234' })
  @IsDefined()
  @IsString()
  AccountNumber!: string;

  @ApiProperty({ type: Number, example: 1000 })
  @IsDefined()
  @IsNumber()
  Balance!: number;

  @ApiProperty({
    enum: Currency,
    enumName: 'Currency',
    examples: ['INR', 'USD', 'GBP', 'AUD', 'JPY', 'EUR'],
  })
  @IsDefined()
  @IsString()
  Currency!: Currency;

  @ApiProperty({
    enum: AccoutStatus,
    enumName: 'AccoutStatus',
    examples: ['ACTIVE', 'INACTIVE', 'DORMANT', 'CLOSED'],
  })
  @IsDefined()
  @IsString()
  Status!: AccoutStatus;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  CreatedAt?: Date;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  UpdatedAt?: Date;
}
