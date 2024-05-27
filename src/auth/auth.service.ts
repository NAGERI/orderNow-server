import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './auth.interface';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  private logger = new Logger('AuthService');

  async getUniqueUser(user: any): Promise<any> {
    const userByEmail = await this.usersService.findOneByEmail(user.username);
    return userByEmail;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createUser(data: AuthCredentialsDto): Promise<any> {
    const { username, password, role } = data;
    try {
      this.logger.verbose('User creation');

      const user = await this.prisma.user.findUnique({
        where: { username: username },
      });

      if (user != null && user.username === username)
        return Error('User already exists.');

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const res = await this.prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          role,
        },
      });
      this.logger.verbose('User created');
      return res;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signInUser(data: AuthCredentialsDto): Promise<any> {
    const { username, password } = data;
    try {
      const user = await this.usersService.findOneByEmail(username);

      if (user && bcrypt.compare(password, user.password)) {
        const payload: IJwtPayload = {
          username,
          role: user.role,
          id: user.id,
        };
        return { accessToken: await this.jwtService.sign(payload) };
      }
      this.logger.error(`Username/password is incorrect! ${user}`);
      throw new UnauthorizedException('Username/Password is incorrect!');
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to Sign In user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async register(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
