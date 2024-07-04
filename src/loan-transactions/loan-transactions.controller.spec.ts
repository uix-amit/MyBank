import { Test, TestingModule } from '@nestjs/testing';
import { LoanTransactionsController } from './loan-transactions.controller';
import { LoanTransactionsService } from './loan-transactions.service';

describe('LoanTransactionsController', () => {
  let controller: LoanTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanTransactionsController],
      providers: [LoanTransactionsService],
    }).compile();

    controller = module.get<LoanTransactionsController>(
      LoanTransactionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
