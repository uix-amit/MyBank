import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUUID } from 'class-validator';

export class IdValidationDto {
  @ApiProperty({
    type: String,
    example: '3abecb07-ce94-4fb6-9988-d2fbcac571ad',
  })
  @IsDefined()
  @IsString()
  @IsUUID()
  id!: string;
}
