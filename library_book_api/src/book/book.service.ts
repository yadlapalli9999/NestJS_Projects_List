import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as  mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
@Injectable()
export class BookService {
   constructor(@InjectModel(Book.name)
   private bookModel:mongoose.Model<Book>){}

   async findAllBooks(query:Query):Promise<Book[]>{
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage -1)
    const keyword = query.keyword?{
        title:{
            $regex:query.keyword,
            $options:'i'
        }
    }:{}
    const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip);
    return books;
   }

   async createBook(book:Book,user:User):Promise<Book>{
    const data = Object.assign(book,{user:user._id})
    const res = await this.bookModel.create(data)
    return res;
   }

   async findBookId(id:string):Promise<Book>{
    const isValidId = mongoose.isValidObjectId(id)

    if(!isValidId){
       throw new BadRequestException('please enter correct id')
    }
    const book = await this.bookModel.findById(id);
    if (!book) {
        throw new NotFoundException('Book not found.');
      }
    return book;
   }

   async updateBookId(id:string,book:Book):Promise<Book>{
    return await this.bookModel.findByIdAndUpdate(id,book,{
        new:true,
        runValidators:true
    });
   }

   async deleteBookId(id:string):Promise<Book>{
      return await this.bookModel.findByIdAndDelete(id)
   }
}
