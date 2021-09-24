import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Crypt } from './password.crypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly crypt: Crypt,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(id: string, password: string): Promise<string> {
    const compare_password = await (
      await this.userRepository.findOne(id)
    ).password;
    if (await this.crypt.compare(compare_password, password)) {
      return await id;
    }
    return await null;
  }
  async login(userId: string) {
    const payload = { id: userId };
    console.log(payload);
    return await {
      access_token: this.jwtService.sign(payload),
    };
  }
}
