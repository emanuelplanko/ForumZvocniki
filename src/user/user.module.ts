import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import { UserService } from './user.service';
import {CommonModule} from "../common/common.module";

@Module({
  imports: [
      //forFeature pomeni, da naj to velja samo nad tem modulom, naj ne velja za celo aplikacijo
      TypeOrmModule.forFeature([User]),
      CommonModule
  ],
  controllers: [UserController],
  providers: [UserService],
    //za povezavo do autha
    exports: [UserService]
})
export class UserModule {}
