import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schema/restaurant.schema';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { query } from 'express';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
    constructor(@InjectModel(Restaurant.name)
    private restaurantModel:Model<Restaurant>
    ){}

    async createRestaruant(createRestaurantDto:CreateRestaurantDto):Promise<Restaurant>{
        const newRestaurant = await this.restaurantModel.create(createRestaurantDto)
        return newRestaurant
    }

    async getAllRestaruant():Promise<Restaurant[]>{
        const restaurants = await this.restaurantModel.find();
        return restaurants
    }

    async getSingleRestaruant(id:string):Promise<Restaurant>{
      const restaurant = await this.restaurantModel.findById(id);

      if(!restaurant){
        throw new NotFoundException('Restaruant not Found')
      }

      return restaurant
    }

    async updateRestaurant(id:string,restaurant):Promise<Restaurant>{
        return await this.restaurantModel.findByIdAndUpdate(id,restaurant,{
            new:true,
            runValidators:true
        })
    }

    async deleteRestaurant(id:string):Promise<Restaurant>{
        return this.restaurantModel.findByIdAndDelete(id)
    }
}
