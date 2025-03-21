import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService,
                private readonly jwtService: JwtService
    ) {}

    async signup(signupDto: SignupDto) {
        if (signupDto.password !== signupDto.passwordConfirmation) {
            throw new HttpException('Paswords do not match!', HttpStatus.BAD_REQUEST);
        }

        const existingUser = await this.databaseService.user.findUnique({where: {email: signupDto.email}});
        if (existingUser) throw new HttpException("The user is already registered!", HttpStatus.BAD_REQUEST);

        const hashedPassword = await bcrypt.hash(signupDto.password, 10);
        console.log(hashedPassword, signupDto)
        return this.databaseService.user.create({
            data: {
                email: signupDto.email,
                password: hashedPassword
            },
            select: {
                id: true,
                email: true
            }
        });
    } 
    
    async signin(signinDto: SigninDto) {
        const user = await this.databaseService.user.findUnique({where: {email: signinDto.email}});
        if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        console.log(user)
        const passwordMatches = user && await bcrypt.compare(signinDto.password, user.password);
        if (!passwordMatches) {
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }
        return user;
    } 
}
