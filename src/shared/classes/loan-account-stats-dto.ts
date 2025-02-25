import { IsNumber, IsPositive } from 'class-validator';

export class LoanAccountStatsDto {
  @IsNumber()
  @IsPositive()
  LoanAmount: number;

  @IsNumber()
  @IsPositive()
  EMI: number;

  @IsNumber()
  @IsPositive()
  InterestPaid: number;
}
