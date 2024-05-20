import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class ResponseUserDto {
  @IsNumber()
  id: number;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole, { message: 'Must have USER or ADMIN roles.' })
  role: UserRole;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  role: UserRole;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;
  @IsEnum(UserRole, { message: 'Must have USER or ADMIN roles.' })
  @IsNotEmpty()
  @IsOptional()
  role?: UserRole;
}
