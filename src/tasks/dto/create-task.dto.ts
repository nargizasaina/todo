import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString({ message: 'Title must be a string!' })
    title: string;

    @IsNotEmpty()
    @IsString({ message: 'Description must be a string!' })
    description: string;

    @IsEnum(["TODO", "IN_PROGRESS", "DONE"], {message: 'Valid status is required!'})
    status: "TODO" | "IN_PROGRESS" | "DONE";
}
