import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Crypt } from './password.crypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private crypt: Crypt,
  ) {}

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.userService.findById(id);
    if (user && (await this.crypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return await result;
    }
    return await null;
  }
  async login(user: any) {
    const payload = { id: user.id };
    return await {
      access_token: this.jwtService.sign(payload),
    };
  }
}
