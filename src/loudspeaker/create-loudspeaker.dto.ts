import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateLoudspeakerDto {

    @IsNotEmpty()
    @IsString()
    model_name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    company: string;

    @IsOptional()
    @IsString()
    frequency_range: string;

    @IsOptional()
    @IsString()
    sensitivity: string;

    @IsOptional()
    @IsString()
    refractive_frequency: string;


}