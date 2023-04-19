import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerCreate(registerDto: RegisterDto): Promise<{
        token: string;
        user: object;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        user: object;
    }>;
}
