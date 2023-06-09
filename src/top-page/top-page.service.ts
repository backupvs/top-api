import { InjectModel } from '@m8a/nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { UpdateTopPageDto } from './dto/update-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel) private readonly topPageModel: ReturnModelType<typeof TopPageModel>
  ) {}

  create(createTopPageDto: CreateTopPageDto) {
    return this.topPageModel.create(createTopPageDto);
  }

  findById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  findByText(text: string) {
    return this.topPageModel.findOne({
      $text: {
        $search: text,
        $caseSensitive: false
      }
    }).exec();
  }

  find(findTopPageDto: FindTopPageDto) {
    return this.topPageModel
      .aggregate()
      .match({ ...findTopPageDto })
      .group({
        _id: { secondCategory: "$secondCategory" },
        pages: { $push: { alias: '$alias', title: '$title' } }
      })
      .exec();
  }

  updateById(id: string, updateTopPageDto: UpdateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, updateTopPageDto, { new: true }).exec();
  }

  deleteById(id: string) {
    return this.topPageModel.findByIdAndRemove(id).exec();
  }
}
