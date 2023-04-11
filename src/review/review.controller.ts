import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new NotFoundException(REVIEW_NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }
}
