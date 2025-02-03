import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FilterNotificationsDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  IsRead: boolean;
}
