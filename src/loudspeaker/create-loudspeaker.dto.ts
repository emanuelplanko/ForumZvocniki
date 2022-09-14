import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateLoudspeakerDto {

    @IsNotEmpty()
    @IsString()
    model_name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    company: string;

    @IsOptional()
    @IsString()
    frequency_range: string;

    @IsOptional()
    @IsString()
    power: string;

    @IsOptional()
    @IsString()
    sensitivity: string;

    @IsOptional()
    @IsString()
    refractive_frequency: string;

    @IsNotEmpty()
    subject_id: number;


}