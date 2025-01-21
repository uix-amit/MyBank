import { Test, TestingModule } from '@nestjs/testing';
import { BraintreeController } from './braintree.controller';

describe('BraintreeController', () => {
  let controller: BraintreeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BraintreeController],
    }).compile();

    controller = module.get<BraintreeController>(BraintreeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
