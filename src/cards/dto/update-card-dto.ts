import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({
    type: String,
    example: '6a4d6c53-4fe7-4648-9d5e-49faefc85b44',
  })
  @IsDefined()
  @IsString()
  CardID!: string;

  @ApiProperty({
    type: String,
    example: '1e364f38-1d7c-4881-b842-663a7855ba45',
  })
  @IsDefined()
  @IsString()
  AccountID!: string;

  @ApiProperty({ type: String, example: '4111111111111111' })
  @IsDefined()
  @IsString()
  CardNumber!: string;

  @ApiProperty({ type: Date, example: new Date() })
  @IsDefined()
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
