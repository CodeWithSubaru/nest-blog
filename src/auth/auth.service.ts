import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO, RegisterDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDTO) {
    const user = this.userRepo.create(credentials);
    await user.save();

    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);
    return { user: { ...user.toJson(), token } };
  }

  async login({ email, password }: LoginDTO) {
    const user = await this.userRepo.findOne({
      where: { email },
    });

    const isSamePassword = (await user?.comparePassword(password)) || false;

    if (user && isSamePassword) {
      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJson(), token } };
    }
  }
}
