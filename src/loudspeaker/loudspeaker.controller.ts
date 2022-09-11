import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UnauthorizedException,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';

import {AuthGuard} from "../auth/auth.guard";
import {JwtService} from "@nestjs/jwt";
import {Request} from 'express';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';
import {extname} from 'path';
import {Loudspeaker} from "./loudspeaker.entity";
import {LoudspeakerService} from "./loudspeaker.service";
import {UpdateLoudspeakerDto} from "./update-loudspeaker.dto";
import {CreateLoudspeakerDto} from "./create-loudspeaker.dto";

@UseGuards(AuthGuard)
@Controller('loudspeaker')
export class LoudspeakerController {

    constructor(
        private loudspeakerService:LoudspeakerService,
        private jwtService: JwtService) {
    }

    @Get()
    getAll () {
        return this.loudspeakerService.getAll();
    }

    @Post('objavi')
    async create (
        @Body() data: CreateLoudspeakerDto,
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        return this.loudspeakerService.create({
            model_name: data.model_name,
            description: data.description,
            company: data.company,
            frequency_range: data.frequency_range,
            power: data.power,
            sensitivity: data.sensitivity,
            refractive_frequency: data.refractive_frequency,
            user: {id: user.id}
        });
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
            destination: './uploads',
            filename(_,file,callback) {
                return callback(null,file.originalname);
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

    @Get(':id')
    getOne(@Param('id') id:number) {
        return this.loudspeakerService.findOne(id);
    }

    /*@Get('podatki')
    async podatki(@Req() request: Request) {
        const token = request.cookies['jwt'];

        //da dobimo ven podatke iz tega cookija
        //jwtService potrebujemo, da lahko verifajamo tokene
        const data = await this.jwtService.verifyAsync(token);

        return this.loudspeakerService.findThat({id: data.id});
    }*/



    @Delete(':id')
    async delete (
        @Param('id') id:number,
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        const post = await this.getOne(id);
        //preverim, če je lastnik
        if (post.user.id != user.id) {
            throw new UnauthorizedException('Nisi lastnik!');
        }

        return this.loudspeakerService.delete(id);
    }

    @Put(':id')
    async update (
        @Param('id') id:number,
        @Body() data: UpdateLoudspeakerDto,
        @Req() request: Request
    ) {
        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        const post = await this.getOne(id);
        //preverim, če je lastnik
        if (post.user.id != user.id) {
            throw new UnauthorizedException('Nisi lastnik!');
        }

        return this.loudspeakerService.update(id,data);
    }
}
