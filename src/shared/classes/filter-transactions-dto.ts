import { ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { isValidDate } from '@shared/utils/date-validator';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterTransactionsDto {
  @Transform(({ value }) => (value ? value : undefined))
  @ApiPropertyOptional({
    enum: TransactionType,
    enumName: 'TransactionType',
    examples: ['CREDIT', 'DEBIT'],
  })
  @IsOptional()
  @IsEnum(TransactionType)
  TransactionType: TransactionType;

  @Transform(({ value }) =>
    isValidDate(value) ? new Date(value).toISOString() : undefined,
  )
  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsString()
  StartDate: Date;

  @Transform(({ value }) =>
    isValidDate(value) ? new Date(value).toISOString() : undefined,
  )
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
