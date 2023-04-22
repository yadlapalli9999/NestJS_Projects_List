import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Category } from "../schema/restaurant.schema";


export class UpdateRestaurantDto{
    
    @IsString()
    @IsOptional()
    readonly name:string;

    
    @IsString()
    @IsOptional()
    readonly description:string;

    
    @IsEmail({},{message:'Please provide correct email'})
    @IsOptional()
    readonly email:string

    @IsPhoneNumber('IN')
    @IsOptional()
    readonly phoneNo:number;

    @IsString()
    @IsOptional()
    readonly address:string;

    @IsEnum(Category,{message:'Please enter correct category'})
    @IsOptional()
    category:Category;
}