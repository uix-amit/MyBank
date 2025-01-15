import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionStatus, TransactionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    type: String,
    example: '099aee00-e693-4278-8448-b7e9cbc83a57',
  })
  @IsDefined()
  @IsString()
  FromAccountID: string;

  @ApiProperty({
    type: String,
    example: '7fe72f96-9184-4641-b8f6-37231862028a',
  })
  @IsDefined()
  @IsString()
  ToAccountID: string;

  @ApiProperty({ type: Number, example: 10.9 })
  @IsDefined()
  Amount: number;

  @ApiProperty({
    enum: TransactionType,
    enumName: 'TransactionType',
    examples: ['CREDIT', 'DEBIT'],
  })
  @IsOptional()
  @IsEnum(TransactionType)
  TransactionType: TransactionType;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  TransactionDate?: Date;

  @ApiProperty({
    enum: TransactionStatus,
    enumName: 'TransactionStatus',
    examples: ['COMPLETE', 'INPROGRESS', 'FAILED'],
  })
  @IsOptional()
  @IsString()
  TransactionStatus: TransactionStatus;
}
