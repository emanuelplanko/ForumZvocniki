import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommonModule} from "../common/common.module";
import {Komentar} from "./komentar.entity";
import {KomentarController} from "./komentar.controller";
import {KomentarService} from "./komentar.service";

@Module({
    //importali smo enako kot v prejšnjem modulu
    imports: [
        TypeOrmModule.forFeature([Komentar]),
        CommonModule
    ],
    controllers: [KomentarController],
    providers: [KomentarService]
})
export class KomentarModule {


}
