import { InjectModel } from '@m8a/nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ReturnModelType<typeof UserModel>,
  ) {}

  async createUser({ email, password }: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const newUser = new this.userModel({
      email,
      passwordHash: await bcrypt.hash(password, salt)
    });

    return newUser.save();
  }

  findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
