import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Loans } from '@prisma/client';
import { addYears } from 'date-fns';

import { JwtAuthGuard } from '@auth/jwt-auth/jwt-auth.guard';
import { CreateLoanDto } from '@loans/dto/create-loan-dto';
import { UpdateLoanDto } from '@loans/dto/update-loan-dto';
import { LoansService } from '@loans/loans.service';
import { NotificationsService } from '@notifications/notifications.service';
import { IdValidationDto } from '@shared/validators/id-validation-dto';

@ApiTags('Loans')
@ApiBearerAuth('Authorization')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@UseGuards(JwtAuthGuard)
@Controller({ path: 'loans', version: '1' })
export class LoansController {
  constructor(
    private readonly loansService: LoansService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Post()
  async create(
    @Request() req: any,
    @Body() createLoanDto: CreateLoanDto,
  ): Promise<Loans> {
    const UserID = req.user.UserID;
    const LoanEndDate = addYears(new Date(), createLoanDto.LoanTerm);
    const loanAccount = await this.loansService.create({
      ...createLoanDto,
      UserID,
      LoanEndDate,
    });
    this.notificationsService.create({
      Message: `Congratulations! Your new loan account ${loanAccount.AccountNumber} has been created successfully.`,
      UserID,
    });
    return loanAccount;
  }

  @Get()
  async findAll(@Request() req: any): Promise<Loans[]> {
    return this.loansService.findAll(req.user.UserID);
  }

  @Get(':id')
  async findOne(@Param() idValidationDto: IdValidationDto): Promise<Loans> {
    return this.loansService.findOne(idValidationDto.id);
  }

  @Patch(':id')
  async update(
    @Param() idValidationDto: IdValidationDto,
    @Body() updateLoanDto: UpdateLoanDto,
  ): Promise<Loans> {
    return this.loansService.update(idValidationDto.id, updateLoanDto);
  }

  @Delete(':id')
  async remove(@Param() idValidationDto: IdValidationDto): Promise<Loans> {
    return this.loansService.remove(idValidationDto.id);
  }
}
