import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    example: 'c3c85fbf-042e-46be-9ad2-d8bbe5b1de7d',
  })
  @IsDefined()
  @IsString()
  UserID!: string;

  @ApiPropertyOptional({ type: String, example: 'John' })
  @IsOptional()
  @IsString()
  FirstName!: string;

  @ApiPropertyOptional({ type: String, example: 'Doe' })
  @IsOptional()
  @IsString()
  LastName!: string;

  @ApiProperty({ type: String, example: 'JohnDoe' })
  @IsOptional()
  @IsString()
  UserName!: string;

  @ApiPropertyOptional({ type: String, example: 'john.doe@gmail.com' })
  @IsOptional()
  @IsString()
  @IsEmail()
  Email!: string;

  @ApiPropertyOptional({ type: String, example: 'xxxxxxxx' })
  @IsOptional()
  @IsString()
  Password!: string;

  @ApiPropertyOptional({ type: String, example: '1234123423' })
  @IsOptional()
  @IsString()
  PhoneNumber!: string;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  DateOfBirth!: Date;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  CreatedAt?: Date;

  @ApiPropertyOptional({ type: Date, example: new Date() })
  @IsOptional()
  @IsDate()
  UpdatedAt?: Date;
}
