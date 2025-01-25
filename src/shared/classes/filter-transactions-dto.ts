import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterTransactionsDto {
  @ApiProperty({
    enum: TransactionType,
    enumName: 'TransactionType',
    examples: ['CREDIT', 'DEBIT'],
  })
  @IsOptional()
  @IsEnum(TransactionType)
  TransactionType: TransactionType;

  @Transform(({ value }) => (value ? new Date(value).toISOString() : undefined))
  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsString()
  StartDate: Date;

  @Transform(({ value }) => (value ? new Date(value).toISOString() : undefined))
  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsString()
  EndDate: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Transform(({ value }) => (value ? parseFloat(value) : undefined))
  MinAmount: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Transform(({ value }) => (value ? parseFloat(value) : undefined))
  MaxAmount: number;
}
