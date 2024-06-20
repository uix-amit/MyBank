import { Test, TestingModule } from '@nestjs/testing';
import { AccountPreferencesService } from './account-preferences.service';

describe('AccountPreferencesService', () => {
  let service: AccountPreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountPreferencesService],
    }).compile();

    service = module.get<AccountPreferencesService>(AccountPreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
