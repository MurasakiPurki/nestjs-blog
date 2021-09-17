import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserAuthDto extends PickType(User, ['id', 'password']) {
  id: string;
  password: string;
}
export class UserDto {
  @ApiProperty({ description: 'id', example: 'test' })
  id: string;

  @ApiProperty({ description: 'password', example: 'test' })
  password: string;

  @ApiProperty({ description: 'nickname', example: 'test' })
  nickname: string;

  @ApiProperty({ description: 'email', example: 'test' })
  email: string;
}
export class GoogleUserAuthDto extends OmitType(User, ['password']) {}
