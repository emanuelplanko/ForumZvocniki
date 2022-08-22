import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import { UserService } from './user.service';

@Module({
  imports: [
      //forFeature pomeni, da naj to velja samo nad tem modulom, naj ne velja za celo aplikacijo
      TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
