import { Injectable , UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Auth } from './schema/auth.schema';
import {Model} from 'mongoose'
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { threadId } from 'worker_threads';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Auth.name)
    private authModel:Model<Auth>,
    private jwtService :JwtService
    ){}

    async register(registerDto:RegisterDto):Promise<{token:string,user:object}>{
        let {name,email,password} = registerDto;
        const hashPassword = await bcrypt.hash(password,10);
        const user = await this.authModel.create({name,email,password:hashPassword});
        const token = await this.jwtService.sign({id:user._id});
        return{
            token,
            user
        }
    }

    async login(loginDto:LoginDto):Promise<{token:string,user:object}>{
        let {email,password} = loginDto;
        const user = await this.authModel.findOne({email});

        if(!user){
            throw new UnauthorizedException("Invaild email and password")
        }

        let isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched){
            throw new UnauthorizedException("Invaild email and password")
        }
        const token = await this.jwtService.sign({id:user._id})
        return{
            token,
            user
        }
    }
}
