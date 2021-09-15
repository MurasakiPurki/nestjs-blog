import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { DeleteResult, UpdateEvent, UpdateResult } from 'typeorm';
import { BlogpostService } from './blogpost.service';
import { PostWriteDto } from './dto/blogpost.dto';
import { Blogpost } from './entities/blogpost.entity';

@Controller()
@ApiTags('Blogpost')
export class BlogpostController {
  constructor(private readonly BlogpostService: BlogpostService) {}

  @Get('blogpost')
  @ApiOperation({
    summary: '모든 게시물 요청 API',
    description: '모든 게시물을 요청한다.',
  })
  async findAll(): Promise<Blogpost[]> {
    return await this.BlogpostService.findAll();
  }
  @Get('blogpost/:target_id')
  @ApiOperation({
    summary: '특정 게시물 요청 API',
    description: '파라미터의 target_id를 기본키로 가지는 게시물 요청한다.',
  })
  @ApiParam({
    name: 'target_id',
    required: true,
    description: '게시물 생성시 지정되는 기본키',
    schema: { type: 'integer' },
  })
  async findById(@Param('target_id') target_id: number): Promise<Blogpost> {
    return await this.BlogpostService.findById(target_id);
  }
  @Post('blogpost')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '게시물 생성 API',
    description: '게시물을 생성한다',
  })
  async createPost(
    @Body() Blogpost: PostWriteDto,
    @Request() req,
  ): Promise<Blogpost> {
    return await this.BlogpostService.createPost({ ...Blogpost }, req.user.id);
  }
  @Put('blogpost/:target_id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'target_id',
    required: true,
    description: '게시물을 생성할 때 지정되는 기본키',
    schema: { type: 'integer' },
  })
  @ApiOperation({
    summary: '게시물 수정 API',
    description: '파라미터의 target_id를 기본키로 가지는 게시물을 수정한다.',
  })
  async updatePost(
    @Param('target_id') target_id,
    @Body() Blogpost: PostWriteDto,
    @Request() req,
  ): Promise<UpdateResult> {
    return await this.BlogpostService.updatePost(
      { ...Blogpost },
      target_id,
      req.user.id,
    );
  }
  @Delete('blogpost/:target_id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'target_id',
    required: true,
    description: '게시물을 생성할 때 지정되는 기본키',
    schema: { type: 'integer' },
  })
  @ApiOperation({
    summary: '게시물 삭제 API',
    description: '파라미터의 target_id를 기본키로 가지는 게시물을 삭제한다.',
  })
  async deletePost(
    @Param('target_id') target_id,
    @Request() req,
  ): Promise<DeleteResult> {
    return await this.BlogpostService.deletePost(target_id, req.user.id);
  }
}
