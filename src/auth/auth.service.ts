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

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  private logger = new Logger('AuthService');

  async getUniqueUser(user: any): Promise<any> {
    try {
      return await this.prisma.user.findUnique({
        where: { username: user.username },
        select: {
          username: true,
          id: true,
          role: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to fetch user details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(data: AuthCredentialsDto): Promise<any> {
    const { username, password } = data;
    try {
      this.logger.verbose('User creation');

      const user = await this.prisma.user.findUnique({
        where: { username: username },
      });

      if (user != null && user.username === username)
        return Error('User already exists.');

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = {
        username,
        password: hashedPassword,
      };

      const res = await this.prisma.user.create({
        data,
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
      const user = await this.prisma.user.findUnique({
        where: { username },
      });

      if (user && bcrypt.compare(password, user.password)) {
        // the payload type is an interface of { username: string }
        const payload: IJwtPayload = { username, userId: user.id };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
      } else {
        this.logger.error(user);
        throw new UnauthorizedException('Failed to Sign In user');
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Failed to Sign In user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
