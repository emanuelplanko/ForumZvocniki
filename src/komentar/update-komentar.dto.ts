import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateKomentarDto {
    @IsNotEmpty()
    @IsString()
    komentar?: string;

}