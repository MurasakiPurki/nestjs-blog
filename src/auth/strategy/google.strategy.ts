import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, VeryfyCallback } from 'passport-google-oauth20';
import { GoogleUserAuthDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Crypt } from '../password.crypt';

@Injectable()
export class googleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly crypt: Crypt,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/user/auth',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VeryfyCallback,
  ): Promise<any> {
    const { displayName, emails, id } = profile;
    const user = {
      id: displayName,
      password: id,
      nickname: displayName,
      email: emails[0].value,
    };
    if (!(await this.userRepository.findOne(user.nickname))) {
      const userdata = this.userRepository.create({
        id: user.nickname,
        password: await this.crypt.hashing(user.id),
        nickname: user.nickname,
        email: user.email,
      });
      this.userRepository.save(userdata);
    }

    done(null, user);
  }
}
