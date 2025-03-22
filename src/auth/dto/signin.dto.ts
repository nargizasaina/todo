import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninDto {
    @ApiProperty({example: 'user@gmail.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: 'qwerty'})
    @IsString()
    @IsNotEmpty()
    password: string;
}