import {Controller, Get} from '@nestjs/common';

//prefix pri controllerju ti pove na kateri endpoint bo tolkel
@Controller('users')
export class UserController {

    //prva funkcija-all
    @Get()
    all() {
        return 'VSS je zakon!';
    }


}
