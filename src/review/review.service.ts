import { InjectModel } from '@m8a/nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Types } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel)
    private readonly reviewModel: ReturnModelType<typeof ReviewModel>
  ) {}

  create(createReviewDto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.reviewModel.create(createReviewDto);
  }

  delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  deleteByProductId(productId: string) {
    return this.reviewModel.deleteMany({
      productId: new Types.ObjectId(productId)
    }).exec();
  }

  findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
    return this.reviewModel.find({
      productId: new Types.ObjectId(productId)
    }).exec();
  }
}
