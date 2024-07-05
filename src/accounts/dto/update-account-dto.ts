import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccoutStatus, Currency } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty({
    type: String,
    example: 'b8fb4b35-0843-44f3-a5c9-d18a40bcfa62',
  })
  @IsDefined()
  @IsString()
  AccountID!: string;

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

  @ApiPropertyOptional({ type: Number, example: 1000 })
  @IsOptional()
  @IsNumber()
  Balance!: number;

  @ApiPropertyOptional({
    enum: Currency,
    enumName: 'Currency',
    examples: ['INR', 'USD', 'GBP', 'AUD', 'JPY', 'EUR'],
  })
  @IsOptional()
  @IsString()
  Currency!: Currency;

  @ApiPropertyOptional({
    enum: AccoutStatus,
    enumName: 'AccoutStatus',
    examples: ['ACTIVE', 'INACTIVE', 'DORMANT', 'CLOSED'],
  })
  @IsOptional()
  @IsString()
  Status!: AccoutStatus;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  CreatedAt?: Date;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  UpdatedAt?: Date;
}
