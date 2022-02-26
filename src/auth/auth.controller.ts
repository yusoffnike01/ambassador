import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}
  @Post('admin/register')
  register(@Body() body: RegisterDto) {
    return body;
  }
}
