import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupDto {
    @ApiProperty({example: 'user@gmail.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: 'qwerty'})
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({example: 'qwerty'})
    @IsString()
    @IsNotEmpty()
    passwordConfirmation: string;
}