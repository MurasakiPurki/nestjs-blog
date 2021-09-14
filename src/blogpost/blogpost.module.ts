import { Module } from '@nestjs/common';
import { BlogpostService } from './blogpost.service';
import { BlogpostController } from './blogpost.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blogpost } from './entities/blogpost.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blogpost]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [BlogpostController],
  providers: [BlogpostService],
})
export class BlogpostModule {}
