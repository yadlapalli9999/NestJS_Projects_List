import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';


@Controller('book')
export class BookController {

    constructor(private bookService:BookService){}

    @Get()
     async getAllBooks(@Query() query:ExpressQuery):Promise<Book[]>{

        return this.bookService.findAllBooks(query)
     }

     @Post()
     @UseGuards(AuthGuard())
     async createByBook(@Body()book:CreateBookDto,@Req() req):Promise<Book>{
        return this.bookService.createBook(book,req.user)
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
