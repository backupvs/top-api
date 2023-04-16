import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { UpdateTopPageDto } from './dto/update-top-page.dto';
import { TopPageService } from './top-page.service';
import { TOP_PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { IdValidationPipe } from '../common/pipes/id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {

  constructor(
    private readonly topPageService: TopPageService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTopPageDto: CreateTopPageDto) {
    return this.topPageService.create(createTopPageDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const topPage = await this.topPageService.findById(id);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }

    return topPage;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const topPage = await this.topPageService.findByAlias(alias);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }

    return topPage;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id', IdValidationPipe) id: string, @Body() updateTopPageDto: UpdateTopPageDto) {
    const topPage = await this.topPageService.updateById(id, updateTopPageDto);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }

    return topPage;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const topPage = await this.topPageService.deleteById(id);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() findTopPageDto: FindTopPageDto) {
    return this.topPageService.find(findTopPageDto);
  }

  @HttpCode(200)
  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }


}
