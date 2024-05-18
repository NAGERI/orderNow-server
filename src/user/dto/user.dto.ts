import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum ROLES {
  USER = 'USER',
  ADMIN = 'ADMIN',
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

  @IsEnum(ROLES, { message: 'Must have USER or ADMIN roles.' })
  role: ROLES;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
