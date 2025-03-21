import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RequestWithUser } from 'src/auth/req-user.interface';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Req() req: RequestWithUser, @Body(ValidationPipe) createTaskDto: CreateTaskDto) {
    const userId = req.user.userId;
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  findAll(@Req() req: RequestWithUser, @Query('status') status?: "TODO" | "IN_PROGRESS" | "DONE") {
    const userId = req.user.userId;
    return this.tasksService.findAll(userId, status);
  }

  @Get(':id')
  findOne(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.userId;
    return this.tasksService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateTaskDto: UpdateTaskDto) {
    const userId = req.user.userId;
    return this.tasksService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  remove(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.userId;
    return this.tasksService.remove(id, userId);
  }
}
