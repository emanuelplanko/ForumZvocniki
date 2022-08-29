import {IsNotEmpty, IsString} from "class-validator";

export class CreateKomentarDto {
    @IsNotEmpty()
    @IsString()
    komentar: string;

    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    loudspeaker_id: number;
}