import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'John' })
  @IsDefined()
  @IsString()
  FirstName!: string;

  @ApiProperty({ type: String, example: 'Doe' })
  @IsDefined()
  @IsString()
  LastName!: string;

  @ApiProperty({ type: String, example: 'john.doe@gmail.com' })
  @IsDefined()
  @IsString()
  @IsEmail()
  Email!: string;

  @ApiProperty({ type: String, example: 'xxxxxxxx' })
  @IsDefined()
  @IsString()
  Password!: string;

  @ApiProperty({ type: String, example: 'JohnDoe' })
  @IsDefined()
  @IsString()
  UserName!: string;

  @ApiProperty({ type: String, example: '1234123423' })
  @IsDefined()
  @IsString()
  PhoneNumber!: string;

  @ApiProperty({ type: Date, example: new Date() })
  @IsDefined()
  @Transform(({ value }) => new Date(value))
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
