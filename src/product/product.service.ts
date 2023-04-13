import { InjectModel } from '@m8a/nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ProductModel } from './product.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from '../review/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel) private readonly productModel: ReturnModelType<typeof ProductModel>
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  updateById(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  findWithReviews(findProductDto: FindProductDto) {
    return this.productModel.aggregate<ProductModel & {
      reviews: ReviewModel,
      reviewsCount: number,
      reviewsAvg: number
    }>([
      {
        $match: { categories: findProductDto.category }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $limit: findProductDto.limit
      },
      {
        $lookup: {
          from: 'Review',
          localField: '_id',
          foreignField: 'productId',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          reviewsCount: { $size: '$reviews' },
          reviewsAvg: { $avg: '$reviews.rating' }
        }
      }
    ]).exec();
  }
}
