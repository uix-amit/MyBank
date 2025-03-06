import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [SharedModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
