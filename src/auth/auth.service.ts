import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ReturnModelType<typeof UserModel>
  ) {}

  async createUser(authDto: AuthDto) {
    const salt = await bcrypt.genSalt(10);
    const newUser = new this.userModel({
      email: authDto.login,
      passwordHash: await bcrypt.hash(authDto.password, salt)
    });

    return newUser.save();
  }

  findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
