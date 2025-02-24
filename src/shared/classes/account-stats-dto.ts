import {
  IsNumber,
  IsObject,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class IncomeExpensesDto {
  @IsNumber()
  @IsPositive()
  numberOfTransactions: number;

  @IsNumber()
  @IsPositive()
  amountOfTransactions: number;
}

export class AccountStatsDto {
  @IsNumber()
  @IsPositive()
  Balance: number;

  @IsObject()
  @ValidateNested()
  @Type(() => IncomeExpensesDto)
  Income: IncomeExpensesDto;

  @IsObject()
  @ValidateNested()
  @Type(() => IncomeExpensesDto)
  Expenses: IncomeExpensesDto;

  @IsNumber()
  Savings: number;
}
