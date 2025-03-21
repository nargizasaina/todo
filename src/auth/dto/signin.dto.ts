import { SignupDto } from "./signup.dto";
import { PartialType } from "@nestjs/mapped-types";

export class SigninDto extends PartialType(SignupDto) {}