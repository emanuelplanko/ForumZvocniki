import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post, Put,
    Req,
    UnauthorizedException, UseGuards
} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";
import {KomentarService} from "./komentar.service";
import {CreateKomentarDto} from "./create-komentar.dto";
import {UpdateKomentarDto} from "./update-komentar.dto";
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('komentarji')
export class KomentarController {
    constructor(
        private komentarService:KomentarService,
        private jwtService: JwtService) {
    }
    @Get()
    getAll () {
        return this.komentarService.getAll();
    }

    @Post('komentiraj')
    async create (
        @Body() data: CreateKomentarDto,
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        return this.komentarService.create({
            komentar: data.komentar,
            user: {id: user.id},
            loudspeaker: {id: data.loudspeaker_id}
        });
    }

    @Get(':id')
    getOne(@Param('id') id:number) {
        return this.komentarService.findOne(id);
    }

    @Delete(':id')
    async delete (
        @Param('id') id:number,
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        const komentar = await this.getOne(id);
        //preverim, če je user, ki sem ga dobil preko requesta, lastnik komentarja od katerega imam id
        if (komentar.user.id != user.id) {
            throw new UnauthorizedException('Nisi lastnik!');
        }

        return this.komentarService.delete(id);
    }

    @Put(':id')
    async update (
        @Param('id') id:number,
        @Body() data: UpdateKomentarDto,
        @Req() request: Request
    ) {
        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        const komentar = await this.getOne(id);
        //preverim, če je user, ki sem ga dobil preko requesta, lastnik komentarja od katerega imam id
        if (komentar.user.id != user.id) {
            throw new UnauthorizedException('Nisi lastnik!');
        }

        return this.komentarService.update(id,data);
    }

    @Get('loudspeaker/:id/replies')
    async getKoments (
        @Param('id') id:number,
        @Req() request: Request
    ) {
        const komentarji = await this.komentarService.getKoments(id);
        return komentarji;
    }

}
