import { index, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

export class TopPageAdvantage {
  @prop()
  title: string;

  @prop()
  description: string;
}

@index({ title: 'text', seoText: 'text' })
export class TopPageModel extends TimeStamps {
  @prop({
    enum: TopLevelCategory
  })
  firstCategory: TopLevelCategory;

  @prop()
  secondCategory: string;

  @prop({
    unique: true
  })
  alias: string

  @prop()
  title: string;

  @prop()
  category: string;

  @prop({
    type: () => [TopPageAdvantage]
  })
  advantages: TopPageAdvantage[];

  @prop()
  seoText: string;

  @prop()
  tagsTitle: string;

  @prop({
    type: [String]
  })
  tags: string[];
}
