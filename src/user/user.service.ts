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
    //user.service je tisti del, ki se naprej preko userRepositorya povezuje na bazo
   async all(): Promise<User[]> {
        return this.userRepository.find();
    }

    //funkcija create bo vračala nazaj enga userja, torej ko mi ustvarimo userja želimo nazaj kot rezultat vrnat vse podatke o tem userju
    create(data): Promise<User> {
       //v oklepaju bomo poslali nek data-se pošlje na userRepository-sprejel ga obm kot spremenljivko
        return this.userRepository.save(data);
    }

    //funkcija findOne
    findOne(condition): Promise<User> {
        //pošlješ čez condition
        return this.userRepository.findOne(condition);
    }

    //sprejme 2 parametra: id in podatke
    //nazaj se bodo poslali posodobljeni podatki
    async update(id, data): Promise<User> {
        //spodnja funkcija bo posodobila podatke
        await this.userRepository.update(id, data);
        return this.findOne({id});
    }

        delete(id: number): Promise<any> {
        return this.userRepository.delete(id);
        }
    //funkcija update mora sprejeti 2 parametra, prvi je id, drugi pa podatki
    //Promise of a user, sprejme id pa podatke, nazaj vrne promise of a user, torej posodobljene podatk od tega userja
   /* update(id, data): Promise<User> {}*/


}