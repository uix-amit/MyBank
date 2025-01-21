import { Test, TestingModule } from '@nestjs/testing';
import { BraintreeService } from './braintree.service';

describe('BraintreeService', () => {
  let service: BraintreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BraintreeService],
    }).compile();

    service = module.get<BraintreeService>(BraintreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
