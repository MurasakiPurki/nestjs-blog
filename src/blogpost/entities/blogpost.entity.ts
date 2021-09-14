import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Blogpost {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'blog_id (primary key)', required: false })
  blog_id: number;

  @Column()
  @ApiProperty({ description: 'title' })
  title: string;

  @Column()
  @ApiProperty({ description: 'content' })
  content: string;

  @ManyToOne(() => User, (User) => User.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'author_id',
    referencedColumnName: 'id',
  })
  @ApiProperty({ description: 'author', required: false })
  author: User;
}
