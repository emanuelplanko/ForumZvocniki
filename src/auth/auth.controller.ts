import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {RegisterDto} from "./register.dto";
import * as bcrypt from 'bcrypt';
//importali smo bcrypt

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService) {
    }

    //naredila se bo registracija
    @Post('register')
    //preko Bodya dobimo podatke
    //ta podatek data je tipa RegisterDto
   async register(@Body() data: RegisterDto) {
        //naš password bomo heširali
        const hashed = await bcrypt.hash(data.password,12);
        return this.userService.create({
            "first_name": data.first_name,
            "last_name": data.last_name,
            "email": data.email,
            "password": hashed,
            //ker je password je hashed
        });
    }

}
