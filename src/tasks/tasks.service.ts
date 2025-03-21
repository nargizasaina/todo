import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: CreateTaskDto) {
    const userExists = await this.databaseService.user.findUnique({
      where: { id: createTaskDto.userId },
    });
  
    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.databaseService.task.create({
      data: createTaskDto
    });
  }

  async findAll(status?: "TODO" | "IN_PROGRESS" | "DONE") {
    if (status) {
      return this.databaseService.task.findMany({
        where: {
          status
        }
      });
    }
    return this.databaseService.task.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.task.findUnique({where: {id}});
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.databaseService.task.update({
      where: {id},
      data : updateTaskDto
    });
  }

  async remove(id: number) {
    return this.databaseService.task.delete({where: {id}});
  }
}