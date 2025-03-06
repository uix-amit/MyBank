import { ApiPropertyOptional } from '@nestjs/swagger';
import { LoanType, TransactionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { isValidDate } from '../utils/date-validator';

export enum LoanOrSavingsTransfer {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  HOME = 'HOME',
  VEHICLE = 'VEHICLE',
  GOLD = 'GOLD',
  MORTGAGE = 'MORTGAGE',
  PERSONAL = 'PERSONAL',
  EDUCATIONAL = 'EDUCATIONAL',
}

export class FilterTransactionsDto {
  @Transform(({ value }) => (value ? value : undefined))
  @ApiPropertyOptional({
    enum: LoanOrSavingsTransfer,
    enumName: 'LoanOrSavingsTransfer',
    examples: ['CREDIT', 'DEBIT', 'HOME', 'VEHICLE'],
  })
  @IsOptional()
  @IsEnum(LoanOrSavingsTransfer)
  TransactionType: TransactionType | LoanType;

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
