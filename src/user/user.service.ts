import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypt } from 'src/auth/password.crypt';
import { Repository } from 'typeorm';
import { UserDto, UserAuthDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private crypt: Crypt,
  ) {}

  async findById(target_id: string): Promise<UserDto> {
    try {
      if (!target_id)
        throw new BadRequestException({ message: '잘못된 요청입니다.' });
      const founduser = (target_id) => {
        return this.userRepository.findOne(target_id);
      };
      if (!founduser(target_id))
        throw new NotFoundException({
          message: '해당 유저는 존재하지 않습니다.',
        });
      return await founduser(target_id);
    } catch (e) {
      Error.captureStackTrace(e);
      console.error(e);
      return await e;
    }
  }
  async findAll(): Promise<UserDto[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      Error.captureStackTrace(e);
      console.error(e);
      return await e;
    }
  }

  async join({ id, password, nickname, email }: UserDto): Promise<UserDto> {
    try {
      const founduser = await this.findById(id);
      if (founduser)
        throw new BadRequestException({
          message: '이미 존재하는 아이디입니다',
        });
      const userData = this.userRepository.create({
        id,
        password: await this.crypt.hashing(password),
        nickname,
        email,
      });
      return await this.userRepository.save(userData);
    } catch (e) {
      Error.captureStackTrace(e);
      console.error(e);
      return await e;
    }
  }
}
