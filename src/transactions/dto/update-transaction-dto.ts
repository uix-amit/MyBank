import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionStatus, TransactionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTransactionDto {
  @ApiProperty({
    type: String,
    example: '3a711828-45c1-4f1c-843a-96a4d4d82a66',
  })
  @IsDefined()
  @IsString()
  TransactionID: string;

  @ApiPropertyOptional({
    type: String,
    example: '099aee00-e693-4278-8448-b7e9cbc83a57',
  })
  @IsOptional()
  @IsString()
  FromAccountID: string;

  @ApiPropertyOptional({
    type: String,
    example: '7fe72f96-9184-4641-b8f6-37231862028a',
  })
  @IsOptional()
  @IsString()
  ToAccountID: string;

  @ApiPropertyOptional({ type: Number, example: 10.9 })
  @IsOptional()
  @IsNumber()
  Amount: number;

  @ApiPropertyOptional({
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

  @ApiPropertyOptional({
    enum: TransactionStatus,
    enumName: 'TransactionStatus',
    examples: ['COMPLETE', 'INPROGRESS', 'FAILED'],
  })
  @IsOptional()
  @IsString()
  TransactionStatus: TransactionStatus;
}
