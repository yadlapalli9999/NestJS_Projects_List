import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema({
    timestamps:true
})

export class Auth extends Document{

    @Prop()
    name:string;

    @Prop({unique:[true,"Duplicate email enterd"]})
    email:string;

    @Prop({
        minlength:[6,'Password should be greater than 6 character'],
        select:true
    })
    password:string;


    @Prop({
        default:'India'
    })
    location:string


}

export const authSchema = SchemaFactory.createForClass(Auth)

