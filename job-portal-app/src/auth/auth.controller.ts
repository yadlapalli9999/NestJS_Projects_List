import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('/register')
    registerCreate(@Body() registerDto:RegisterDto):Promise<{token:string,user:object}>{
       return this.authService.register(registerDto)
    }

    @Post('/login')
    login(@Body() loginDto:LoginDto):Promise<{token:string,user:object}>{
        return this.authService.login(loginDto)
    }
}
