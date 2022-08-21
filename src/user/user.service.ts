import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    //se bo avtomatsko pognal ko ga obmo rabli
    constructor(
        //userRepository je ime spremenljivke oz. ime tega objekta
        //podatkovni tip Repository<User>-od userja
        //tale konstruktor je narejen da v spremenljivko userRepository naredi dostop do baze
        @InjectRepository(User) private readonly userRepository: Repository<User>

    ) {
    }

    //funkcija all vrača userje v obliki arraya
    //funkcija lahko vrača več kot enga userja
    //return this se osredotoči na spremenljivko userRepository
    //ker dam brez pogoja mi bo find vrnil vse kar je v tabeli user
    //da lahko iz userjev dostopam do servica, moram imeti v konstruktorju kazalec-pointer-vektor do sem in isto mora imeti service kazalec-pointer na repository
    //repository je spremenljivka userRepository in on se poveže na tabelo user
    //modul je kot api ki skrbi za vse-starš, znotraj tega imamo kontroler ki skrbi samo za en pointer
   async all(): Promise<User[]> {
        return this.userRepository.find();
    }

}