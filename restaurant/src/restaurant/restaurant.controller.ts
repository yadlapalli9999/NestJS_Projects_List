import { Body, Controller,Post,Get, Param, Put, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './schema/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
    constructor(private restaurantService:RestaurantService){}
    
    @Post()
    async create(@Body() createRestaurantDto:CreateRestaurantDto):Promise<Restaurant>{
      return this.restaurantService.createRestaruant(createRestaurantDto)
    }

    @Get()
    async getAll():Promise<Restaurant[]>{
      return this.restaurantService.getAllRestaruant();
    }

    @Get(":id")
    async getById(@Param('id') id:string):Promise<Restaurant>{
      return this.restaurantService.getSingleRestaruant(id)
    }
    
    @Put(":id")
    async updateRestaurant(@Param('id') id:string,@Body() updateRestaurantDto:UpdateRestaurantDto):Promise<Restaurant>{
          await this.restaurantService.getSingleRestaruant(id)
        return this.restaurantService.updateRestaurant(id,updateRestaurantDto)
    }

    @Delete(":id")
    async deleteRestaurant(@Param('id') id:string):Promise<{deleted:Boolean}>{
      await this.restaurantService.getSingleRestaruant(id);
      const restaruant = this.restaurantService.deleteRestaurant(id);
      if(restaruant){
        return{
          deleted:true
        }
      }
    }

}
