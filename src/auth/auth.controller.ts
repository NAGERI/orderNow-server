import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthCredentialsDto,
  AuthSignInCredentialsDto,
} from './dto/authCredentials.dto';
import { Response } from 'express';
import { GetUser } from './get-user.decorator';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private logger = new Logger('AuthService');

  @Get('me')
  @UseGuards(JwtAuthGuard) // without this, the custom decorator cannot work
  async getUserdetails(@GetUser() user: AuthCredentialsDto) {
    this.logger.log(
      `Fetching profile details for Logged In User:  ${user.username + ' role :  ' + user.role}`,
    );
    return this.authService.getUniqueUser(user);
  }

  @Post('signup')
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

  @Post('signin')
  async signin(
    @Body() authSignInCredentialsDto: AuthSignInCredentialsDto,
    @Res() res: Response,
  ) {
    const { username, password } = authSignInCredentialsDto;
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
