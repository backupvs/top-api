import { TopLevelCategory } from '../top-page.model';

export class CreateTopPageDto {
  firstCategory: TopLevelCategory;
  secondCategory: string;
  title: string;
  category: string;
  advantages: {
    title: string;
    description: string;
  }[];
  seoText: string;
  tagsTitle: string;
  tags: string[];
}