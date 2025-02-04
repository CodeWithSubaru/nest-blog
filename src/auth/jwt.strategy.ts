import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserEntity } from 'src/entities/user.entity';
import { AuthPayload } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY!,
    });
  }

  async validate(payload: AuthPayload) {
    try {
      const user = await this.userRepository.findOne({
        where: { username: payload.username },
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) return error.getResponse();
    }
  }
}
