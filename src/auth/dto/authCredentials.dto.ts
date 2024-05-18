import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole, { message: 'Must have USER or ADMIN roles.' })
  role?: UserRole;
}

export class AuthSignInCredentialsDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
