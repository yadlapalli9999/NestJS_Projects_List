import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Category } from "../schema/restaurant.schema";


export class CreateRestaurantDto{
    
    @IsNotEmpty()
    @IsString()
    readonly name:string;

    @IsNotEmpty()
    @IsString()
    readonly description:string;

    @IsNotEmpty()
    @IsEmail({},{message:'Please provide correct email'})
    readonly email:string

    @IsNotEmpty()
    @IsPhoneNumber('IN')
    readonly phoneNo:number;

    @IsNotEmpty()
    @IsString()
    readonly address:string;

    @IsNotEmpty()
    @IsEnum(Category,{message:'Please enter correct category'})
    category:Category;
}