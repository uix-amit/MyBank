import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLoanTransactionDto {
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
  @IsNumber()
  Amount: number;

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
  @IsDefined()
  @IsString()
  TransactionStatus: TransactionStatus;
}
