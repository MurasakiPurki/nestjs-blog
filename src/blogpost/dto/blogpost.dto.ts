import { PickType } from '@nestjs/swagger';

import { Blogpost } from '../entities/blogpost.entity';

export class PostWriteDto extends PickType(Blogpost, ['title', 'content']) {
  title: string;
  content: string;
}
