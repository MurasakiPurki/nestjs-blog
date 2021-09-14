import { ApiProperty } from '@nestjs/swagger';
import { Blogpost } from 'src/blogpost/entities/blogpost.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  @ApiProperty({ description: 'id', example: 'test' })
  public readonly id: string;

  @Column()
  @ApiProperty({ description: 'password', example: 'test' })
  password: string;

  @Column()
  @ApiProperty({ description: 'nickname', example: 'test' })
  nickname: string;

  @Column()
  @ApiProperty({ description: 'email', example: 'test' })
  email: string;

  @OneToMany(() => Blogpost, (Blogpost) => Blogpost.blog_id)
  @ApiProperty()
  wrotepost: Blogpost[];
}
