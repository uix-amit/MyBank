import { Test, TestingModule } from '@nestjs/testing';
import { AccountPreferencesController } from './account-preferences.controller';
import { AccountPreferencesService } from './account-preferences.service';

describe('AccountPreferencesController', () => {
  let controller: AccountPreferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountPreferencesController],
      providers: [AccountPreferencesService],
    }).compile();

    controller = module.get<AccountPreferencesController>(
      AccountPreferencesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
