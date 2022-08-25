import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";

@Module({
  //dobili smo error v auth controllerju, zato smo spodaj importali-imports: [UserModule],
  imports: [UserModule],
  controllers: [AuthController]
})
export class AuthModule {}
