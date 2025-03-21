import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString({ message: 'Title must be a string!' })
    title: string;

    @IsString({ message: 'Description must be a string!' })
    description: string;

    @IsEnum(["TODO", "IN_PROGRESS", "DONE"], {message: 'Valid status is required!'})
    status: "TODO" | "IN_PROGRESS" | "DONE";

    @IsOptional()
    createdAt: Date; 

    @IsOptional()
    updatedAt: Date;

    @IsInt({ message: 'User ID must be a number!' })
    userId: number;
}
