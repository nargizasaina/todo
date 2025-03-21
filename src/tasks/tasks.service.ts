import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const userExists = await this.databaseService.user.findUnique({
      where: { id: userId },
    });
  
    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.databaseService.task.create({
      data: {
        ...createTaskDto,
        userId
      }
    });
  }

  async findAll(userId: number, status?: "TODO" | "IN_PROGRESS" | "DONE") {
    return this.databaseService.task.findMany({
      where: {
        userId,
        ...(status && { status }),
      }
    });
  }

  async findOne(id: number, userId: number) {
    return await this.checkTask(id, userId);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    await this.checkTask(id, userId);
console.log(updateTaskDto)
    return this.databaseService.task.update({
      where: {id, userId},
      data : updateTaskDto
    });
  }

  async remove(id: number, userId: number) {
    const task = await this.checkTask(id, userId);

    return this.databaseService.task.delete({where: {id: task.id}});
  }

  private async checkTask(id: number, userId: number) {
    const task = await this.databaseService.task.findUnique({ where: { id } });

    if (!task) {
      throw new HttpException('Task not found!', HttpStatus.NOT_FOUND);
    }

    if (task.userId !== userId) {
      throw new HttpException('Not authorized!', HttpStatus.FORBIDDEN);
    }

    return task;
  }
}