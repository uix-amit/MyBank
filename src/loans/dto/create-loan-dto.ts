import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LoanAccountStatus, LoanType } from '@prisma/client';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({
    type: String,
    example: '82cba0c1-00d7-46ca-904a-6558fe953cee',
  })
  @IsDefined()
  @IsString()
  UserID!: string;

  @ApiProperty({
    type: String,
    example: 'a7c94318-3caf-4dcd-985e-a9f0320abc77',
  })
  @IsDefined()
  @IsString()
  BankID!: string;

  @ApiProperty({ type: String, example: '1234123412341234' })
  @IsDefined()
  @IsString()
  AccountNumber!: string;

  @ApiProperty({ enum: LoanType, enumName: 'LoanType', example: 'HOME' })
  @IsDefined()
  @IsEnum(LoanType)
  LoanType!: LoanType;

  @ApiProperty({ type: String, example: 3972000 })
  @IsDefined()
  LoanAmount!: number;

  @ApiProperty({ type: String, example: 9.3 })
  @IsDefined()
  InterestRate!: number;

  @ApiProperty({ type: String, example: 360 })
  @IsDefined()
  @IsInt()
  LoanTerm!: number;

  @ApiProperty({ type: String, example: new Date() })
  @IsDefined()
  @IsDate()
  LoanStartDate!: Date;

  @ApiProperty({ type: String, example: new Date() })
  @IsDefined()
  @IsDate()
  LoanEndDate!: Date;

  @ApiProperty({ type: String, example: 360 })
  @IsDefined()
  @IsInt()
  RemainingTenure!: number;

  @ApiProperty({
    enum: LoanAccountStatus,
    enumName: 'LoanAccountStatus',
    example: 'OUTSTANDING',
  })
  @IsDefined()
  @IsEnum(LoanAccountStatus)
  LoanStatus!: LoanAccountStatus;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  CreatedAt?: Date;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  UpdatedAt?: Date;
}
