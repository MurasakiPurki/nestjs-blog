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
  async compare(
    encrypted_password: string,
    input_password: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(input_password, encrypted_password);
    console.log(isMatch);
    return await isMatch;
  }
}
