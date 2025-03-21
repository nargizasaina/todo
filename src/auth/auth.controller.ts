import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signup(@Body(ValidationPipe) user: SignupDto) {
        return this.authService.signup(user);
    } 

    @Post('/signin')
    signin(@Body(ValidationPipe) user: SigninDto) {
        return this.authService.signin(user);
    } 
}
