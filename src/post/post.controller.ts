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
import {PostService} from "./post.service";
import {AuthGuard} from "../auth/auth.guard";
import {JwtService} from "@nestjs/jwt";
import {CreatePostDto} from "./create-post.dto";
import {Request} from 'express';
import {UpdatePostDto} from "./update-post.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';
import {extname} from 'path';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {

    constructor(
        private postService:PostService,
        private jwtService: JwtService) {
    }

    @Get()
    getAll () {
        return this.postService.getAll();
    }

    @Post()
    async create (
        @Body() data: CreatePostDto,
        //noter v Requestu je jwt
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        //v create spodaj je treba poslati podatke
        //ne morem poslati čez samo data, ker v dati nimam user id-noter je samo title pa content
        //user mora biti poslan v obliki objekta-v entity piše, da je user tipa User-zato je treba v controllerju spremenljivko user poslati kot objekt
        return this.postService.create({
            title: data.title,
            content: data.content,
            subject: {id: data.subject_id},
            user: {id: user.id}
        });
    }

    @Post('upload')
    //kateri user je to postu
    //treba je priti do jwt, ta pa nato pove, kateri user je kaj postu
    //UseInterceptors je en vmesnik, preko tega interceptorja poberemo file in ga bomo storali kamorkoli se odločimo
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
        return this.postService.findOne(id);
    }

    @Delete(':id')
    async delete (
        @Param('id') id:number,
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        const post = await this.getOne(id);
        //preverim, če je user, ki sem ga dobil preko requesta, lastnik posta od katerega imam id
        if (post.user.id != user.id) {
            throw new UnauthorizedException('Nisi lastnik!');
        }

        return this.postService.delete(id);
    }

    @Put(':id')
    async update (
        //preko Param dobim, kateri post updejtam
        @Param('id') id:number,
        //preko Bodya pa dobim katere so vse stvari, ki jih bom posodobil
        @Body() data: UpdatePostDto,
        //preko Req dobim kateri user je sprožil update
        @Req() request: Request
    ) {
        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        const post = await this.getOne(id);
        //preverim, če je user, ki sem ga dobil preko requesta, lastnik posta od katerega imam id
        if (post.user.id != user.id) {
            throw new UnauthorizedException('Nisi lastnik!');
        }

        return this.postService.update(id,data);
    }
}
