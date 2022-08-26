import {IsNumber, IsOptional, IsString} from "class-validator";

export class UpdatePostDto {
    @IsString()
    @IsOptional()
    //vprašaj pomeni, da bo dto veljaven tudi, če dobimo samo title ali pa samo content-da stvar ni obvezna
    //vprašaj pomeni, da bo dto šel čez, če je vsaj eden izmed teh izpolnjen, lahko je tudi vse prazno, ne bo pa šel čez, če bo noter kakšno polje, ki ni ustrezno temu, kar je noter napisano
    title?:string;

    @IsOptional()
    @IsString()
    content?:string;

    @IsOptional()
    @IsNumber()
    subject_id?:number;
}