import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    type: String,
    example: '3abecb07-ce94-4fb6-9988-d2fbcac571ad',
  })
  @IsDefined()
  @IsString()
  AccountID!: string;

  @ApiProperty({ type: String, example: '411111111111' })
  @IsDefined()
  @IsString()
  CardNumber!: string;

  @ApiProperty({ type: Date, example: new Date() })
  @IsDefined()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  ExpirationDate!: Date;

  @ApiProperty({ type: Number, example: 123 })
  @IsDefined()
  @IsInt()
  CVV!: number;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  CreatedAt?: Date;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  UpdatedAt?: Date;
}
