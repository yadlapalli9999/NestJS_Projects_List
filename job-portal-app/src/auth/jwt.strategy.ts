import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from "mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Auth } from "./schema/auth.schema";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectModel(Auth.name)
    private authModel:Model<Auth>
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET
        });
    }

    async validate(payload){
        const {id} = payload;
        const user = await this.authModel.findById(id)

        if(!user){
            throw new UnauthorizedException("Login first to access this endpoint")
        }
        return user
    }
}