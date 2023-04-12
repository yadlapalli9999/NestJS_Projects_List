import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';


@Controller('book')
export class BookController {

    constructor(private bookService:BookService){}

    @Get()
     async getAllBooks(@Query() query:ExpressQuery):Promise<Book[]>{

        return this.bookService.findAllBooks(query)
     }

     @Post()
     async createByBook(@Body()book:CreateBookDto):Promise<Book>{
        return this.bookService.createBook(book)
     }

     @Get(":id")
     async getBookById(@Param('id') id:string,book:Book):Promise<Book>{
        return this.bookService.findBookId(id)
     }

     @Put(":id")
     async updateByBook(@Param('id') id:string,@Body() book:UpdateBookDto):Promise<Book>{
        return this.bookService.updateBookId(id,book)
     }

     @Delete(":id")
     async deleteBookId(@Param('id') id:string):Promise<Book>{
        return this.bookService.deleteBookId(id)
     }
}
