import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @MinLength(6)
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  bio?: string;

  image?: string;
}

export interface AuthPayload {
  username: string;
}
