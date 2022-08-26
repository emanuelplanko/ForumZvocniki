import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {CommonModule} from "../common/common.module";

@Module({
  //dobili smo error v auth controllerju, zato smo spodaj importali-imports: [UserModule],
  //importali smo za jwtmodule
  imports: [
      UserModule,
      CommonModule
    ],
  controllers: [AuthController]
})
export class AuthModule {}
