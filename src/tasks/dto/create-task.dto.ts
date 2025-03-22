import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class CreateTaskDto {
    @ApiProperty({ example: 'Task Title'})
    @IsNotEmpty()
    @IsString({ message: 'Title must be a string!' })
    title: string;

    @ApiProperty({ example: 'Task description'})
    @IsNotEmpty()
    @IsString({ message: 'Description must be a string!' })
    description: string;

    @ApiProperty({ 
        example: TaskStatus.TODO,
        enum: TaskStatus 
      })
    @IsEnum(TaskStatus, {message: 'Status  should be "TODO" or "IN_PROGRESS" or "DONE"'})
    status: "TODO" | "IN_PROGRESS" | "DONE";
}
