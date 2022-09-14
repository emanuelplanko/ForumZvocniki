import {IsNotEmpty, IsString} from "class-validator";

export class CreateKomentarDto {
    @IsNotEmpty()
    @IsString()
    komentar: string;

    @IsNotEmpty()
    loudspeaker_id: number;
}

/*
    @IsNotEmpty()
    user_id: number;
*/