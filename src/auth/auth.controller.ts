import {BadRequestException, Body, Controller, NotFoundException, Post, Res, UseGuards} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {RegisterDto} from "./register.dto";
import * as bcrypt from 'bcrypt';
//importali smo bcrypt
import {LoginDto} from "./login.dto";
import {NotFoundError} from "rxjs";
import {JwtService} from "@nestjs/jwt";
//importati smo morali Response iz expressa in ne iz nestjs common
import {Response} from 'express';
import {AuthGuard} from "./auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService,
                private jwtService: JwtService
                ) {
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

    @Post('login')
    //funkcija login
   async login(@Body() data: LoginDto,
               //da lahko pošiljamo podatke nazaj smo morali importati @Res
               //da je cookie začel delovat je bilo treba dodati ukaz passthrough: true
               @Res({passthrough: true}) response: Response) {
        //spodnja koda bo poiskala ali sploh obstaja user s tem mailom, pa če obstaja si bom to shranil v neko spremenljivko user
        const user = await this.userService.findOne({email: data.email});
        if (!user) {
            //ko pride do tega errorja, se delovanje aplikacije prekine
            throw new NotFoundException('Uporabnik ne obstaja');
        }

        //preveri, če je password, ki ga je vpisal uporabnik enak passwordu, ki je v bazi
        //data password je to kar jaz vpišem(v plain textu), user password pa je zakodiran password v bazi
        if(!await bcrypt.compare(data.password,user.password)) {
            throw new BadRequestException('Napačno geslo');
        }

        //če se nahajam tukaj, je uporabnik vnesel pravilne login podatke, sedaj lahko kreiram const jwt
        //jwt token-da lahko dela moramo poslati payload(2.del jwt kode)
        //v spremenljivki jwt je shranjen cel tist token
        const jwt = await this.jwtService.signAsync({id: user.id});

        //zgoraj v loginu smo importali @Res
        //ime cookija je jwt
        //httpOnly-do njega lahko dostopa samo brskalnik, ne pa uporabnik-ni shranjen na disku, samo v brskalniku
        response.cookie('jwt',jwt,{httpOnly:true});

        return user;
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    //dobim cookie, ki se zbriše
    logout(@Res({passthrough:true}) response: Response) {
        response.clearCookie('jwt');
        return {
            message: 'Success'
        }
    }

}
