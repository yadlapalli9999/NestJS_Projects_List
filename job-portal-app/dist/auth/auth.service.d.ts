import { Auth } from './schema/auth.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
export declare class AuthService {
    private authModel;
    private jwtService;
    constructor(authModel: Model<Auth>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        token: string;
        user: object;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        user: object;
    }>;
}
