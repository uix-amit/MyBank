import { Test, TestingModule } from '@nestjs/testing';
import { LoanTransactionsService } from './loan-transactions.service';

describe('LoanTransactionsService', () => {
  let service: LoanTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanTransactionsService],
    }).compile();

    service = module.get<LoanTransactionsService>(LoanTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
