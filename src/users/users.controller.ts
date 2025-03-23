import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: 'Get all users', description: 'Роут добавлен для проверки и тестирования'})
  @ApiResponse({status: 200})
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: 'Get user by id', description: 'Роут добавлен для проверки и тестирования'})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({summary: 'Delete user', description: 'Роут добавлен для проверки и тестирования'})
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
