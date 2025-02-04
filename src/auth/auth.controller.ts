import { LoginDTO, RegisterDTO } from 'src/models/user.model';
import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(@Body(new ValidationPipe()) credentials: RegisterDTO) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  login(@Body(ValidationPipe) credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
}
