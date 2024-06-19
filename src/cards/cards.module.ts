import { Module } from '@nestjs/common';

import { CardsService } from '@cards/cards.service';
import { CardsController } from '@cards/cards.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
