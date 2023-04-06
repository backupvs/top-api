import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {

  }

  @Get(':id')
  async get(@Param('id') id: string) {

  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {

  }

  @Delete(':id')
  async delete(@Param('id') id: string) {

  }

  @HttpCode(200)
  @Post()
  async find(@Body() findProductDto: FindProductDto) {

  }
}
