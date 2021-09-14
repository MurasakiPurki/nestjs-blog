import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Blogpost } from './entities/blogpost.entity';
import { PostWriteDto } from './dto/blogpost.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BlogpostService {
  constructor(
    @InjectRepository(Blogpost)
    private blogpostRepository: Repository<Blogpost>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Blogpost[]> {
    try {
      return await this.blogpostRepository.find();
    } catch (e) {
      Error.captureStackTrace(e);
      console.error(e);
      return await e;
    }
  }

  async findById(target_id: number): Promise<Blogpost> {
    try {
      if (!target_id)
        throw new BadRequestException({ message: '잘못된 요청입니다.' });
      const foundpost = (target_id) => {
        return this.blogpostRepository.findOne(target_id);
      };
      if (!foundpost(target_id))
        throw new NotFoundException({
          message: '해당 게시물이 존재하지 않습니다.',
        });
      return await foundpost(target_id);
    } catch (e) {
      Error.captureStackTrace(e);
      console.error(e);
      return await e;
    }
  }

  async createPost({ title, content }: PostWriteDto, signedUser): Promise<any> {
    try {
      const blogData = this.blogpostRepository.create({
        title,
        content,
        author: {
          id: (await this.userRepository.findOne(signedUser)).id,
        },
      });
      /* const user = this.userRepository.findOne();
      if(!user) throw new NotFoundException('해유저ㄹ 찾ㅣㅗ했ㅡ니');

      const _blogData = new Blogpost();
      _blogData.content =content;
      _blogData.title = title;
      _blogData.author = user; */
      return await this.blogpostRepository.save(blogData);
    } catch (e) {
      Error.captureStackTrace(e);
      console.error(e);
      return await e;
    }
  }

  async updatePost(
    { title, content }: PostWriteDto,
    target_id,
    signedUser,
  ): Promise<UpdateResult> {
    try {
      if ((await this.findById(target_id)).author !== signedUser)
        throw new ForbiddenException({ message: '잘못된 접근입니다.' });
      const blogData = this.blogpostRepository.create({ title, content });
      return await this.blogpostRepository.update(target_id, blogData);
    } catch (e) {
      Error.captureStackTrace(e);
      console.error(e);
      return await e;
    }
  }
  async deletePost(target_id, signedUser): Promise<DeleteResult> {
    try {
      if ((await this.findById(target_id)).author !== signedUser)
        throw new ForbiddenException({ message: '잘못된 접근입니다.' });
      return await this.blogpostRepository.delete(target_id);
    } catch (e) {
      Error.captureStackTrace(e);
      console.error(e);
      return await e;
    }
  }
}
