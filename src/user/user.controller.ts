import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";

//prefix pri controllerju ti pove na kateri endpoint bo tolkel
//za celotni kontroler je users prefix
@Controller('users')
export class UserController {
    constructor(
        //UserService je podatkovni tip
        //da lahko prideš iz controllerja user v service je bilo treba v konstruktor nastavit, da je spremenljivka userService tako kot vektor-pointer nad userService modul
        private userService: UserService) {
    }

    //prva funkcija-all
    //to kar piše v @Get je endpoint
    //osnova je users, vsi je nov endpoint
    @Get('users')
    all() {
        //poiščeš funkcijo all, ki si jo prej naredil v user.service.ts
        return this.userService.all();
    }

    //user.controller naj se odzove na Post klic na endpoint user
    //celoten controller ima users prefix
    @Post('user')
    //iz Bodya bo funkcija prejela nek data(iz Bodya bom prejel podatke)
    //tudi ta funkcija bo nazaj vračala promise of a user
    //ko v Postmanu pritisnem Send bo funkcija create preko Bodya prejela neke podatke in celotne te podatke bo poslala funkciji create v user.service
    //user.service je edini, ki je povezan z bazo torej z user.Respositoryem, bo rekel user.Repository.save te podatke in mi bomo v bazi dobili tega userja brez, da napišemo kak insert stavek
    create (@Body() data): Promise<User> {
        return this.userService.create(data);
    }

    //id je moja izmišljena spremenljivka
    @Get(':id')
    //funkcija getUserById
    //spodaj manjka condition
    //Param je namesto Bodya, preko Parama bom dobil spremenljivko id-črpal bom spremenljivko id-to si bom pa shranu v id number
    //karkoli bom dobil v Get se bo shranilo v Param pod property id, nato si pa bo to shranu v spremenljivko id, ki pa je tipa number
    //pri findOne je treba poslati še condition
    //ker se držimo pravil, lahko dam noter samo zavit oklepaj in napišem id
    getUserById(@Param('id') id: number) : Promise<User> {
        return this.userService.findOne({id});
    }


    @Put(':id')
    //isto kot v user.service.ts, je potrebno tudi tukaj dodati async pa await, ker je tudi tam
    async update(
        @Param('id') id:number,
        @Body() data
    ) : Promise<User> {
        return  await  this.userService.update(id, data);
    }

    @Delete(':id')
    //Param sprejme id
    delete(@Param('id') id:number) : Promise<any> {
        return this.userService.delete(id);
    }

    //ustvarila se bo nova funkcija, ki bo dobivala podatke preko Posta in na endpoint, ki ga bom pošiljal je user
    //ime funkcije je tudi create-ta funkcija bo dobila Body, ki je poimenovan data
   /* @Post('user')
    create(@Body() data) {
        return data;
    }*/
}
