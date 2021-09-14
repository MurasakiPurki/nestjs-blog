import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Crypt {
  async hashing(password: string): Promise<string> {
    const saltOrRounds = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, saltOrRounds);
    console.log(hashpassword);
    return await hashpassword;
  }
  async compare(userpassword: string, hashpassword: string): Promise<boolean> {
    console.log(hashpassword, userpassword);
    const isMatch = await bcrypt.compare(userpassword, hashpassword);
    console.log(isMatch);
    return await isMatch;
  }
}
