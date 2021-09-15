import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { UserDto, UserAuthDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Get('findall')
  @ApiOperation({
    summary: '모든 유저정보 요청 API',
    description: '모든 유저정보를 요청하는 API',
  })
  async findAll(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }
  @Post('join')
  @ApiOperation({
    summary: '회원가입 API',
    description: '유저 정보를 등록한다.',
  })
  async join(@Body() user: UserDto): Promise<UserDto> {
    return this.userService.join(user);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: '로그인 API',
    description:
      '같은 id와 password를 가진 데이터가 있는지 검색후 엑세스토큰을 반환한다.',
  })
  async login(@Body() authData: UserAuthDto, @Request() req): Promise<any> {
    return this.authService.login(req.user);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '유저 정보 갱신 API',
  })
  @Get('profile')
  async getProfile(@Request() req) {
    return await req.user;
  }
}
