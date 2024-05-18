import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response,
  ) {
    const { username, password } = authCredentialsDto;
    const result = await this.authService.createUser({
      username,
      password,
    });
    if (result instanceof Error) {
      throw new ConflictException('User already exists!');
    }
    return res.status(HttpStatus.CREATED).json(result);
  }

  @Post('/signin')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response,
  ) {
    const { username, password } = authCredentialsDto;
    const result = await this.authService.signInUser({
      username,
      password,
    });
    if (result instanceof Error) {
      throw new UnauthorizedException('Username or Password is wrong!');
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
