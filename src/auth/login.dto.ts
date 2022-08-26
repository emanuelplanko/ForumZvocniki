import {IsEmail, IsNotEmpty} from "class-validator";
//import iz class validatorja
export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}