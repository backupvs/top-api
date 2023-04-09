import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { AuthModel } from './auth.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AuthModel,
        schemaOptions: {
          collection: 'Auth'
        }
      }
    ])
  ],
  controllers: [AuthController]
})
export class AuthModule {}
