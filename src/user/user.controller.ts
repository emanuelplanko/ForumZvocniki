import {Controller, Get} from '@nestjs/common';
import {UserService} from "./user.service";

//prefix pri controllerju ti pove na kateri endpoint bo tolkel
@Controller('users')
export class UserController {
    constructor(
        //UserService je podatkovni tip
        //da lahko prideš iz controllerja user v service je bilo treba v konstruktor jnastavit, da je spremenljivka userService tako kot vektor-pointer nad userService modul
        private userService: UserService) {
    }

    //prva funkcija-all
    //to kar piše v @Get je endpoint
    //osnova je users, vsi je nov endpoint
    @Get('vsi')
    all() {
        //poiščeš funkcijo all, ki si jo prej naredil v user.service.ts
        return this.userService.all();
    }


}
