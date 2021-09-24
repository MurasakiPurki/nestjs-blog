import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'id' });
  }

  async validate(id: string, password: string): Promise<any> {
    try {
      const isUser = await this.authService.validateUser(id, password);
      if (isUser) return await isUser;
      else throw new UnauthorizedException({ message: '잘못된 접근입니다.' });
    } catch (e) {
      console.error(e);
      Error.captureStackTrace(e);
      return null;
    }
  }
}
