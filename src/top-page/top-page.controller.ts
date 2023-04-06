import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { UpdateTopPageDto } from './dto/update-top-page.dto';

@Controller('top-page')
export class TopPageController {

  @Post('create')
  async create(@Body() createTopPageDto: CreateTopPageDto) {

  }

  @Get(':id')
  async get(@Param('id') id: string) {

  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() updateTopPageDto: UpdateTopPageDto) {

  }

  @Delete(':id')
  async delete(@Param('id') id: string) {

  }

  @HttpCode(200)
  @Post()
  async find(@Body() findTopPageDto: FindTopPageDto) {

  }
}
