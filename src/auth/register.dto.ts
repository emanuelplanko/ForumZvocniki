import {IsEmail, IsNotEmpty} from "class-validator";
//import iz class validatorja
export class RegisterDto {
    //tale dto je samo za registracijo, login bo imel posebej dto
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}