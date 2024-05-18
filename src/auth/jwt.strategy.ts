import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IJwtPayload } from './auth.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: IJwtPayload): Promise<any> {
    const { username } = payload;
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new UnauthorizedException('No token!');
    return user;
  }
}
