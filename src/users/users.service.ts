import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor (private readonly databaseService: DatabaseService) {};

  async findAll() {
    return this.databaseService.user.findMany({
      select: {
        id: true,
        email: true,
        tasks: {
          orderBy: {
            createdAt: 'desc'
          }
        }, 
      }
    });
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({ 
      where: {id} ,
      select: {
        id: true,
        email: true,
        tasks: {
          orderBy: {
            createdAt: 'desc'
          }
        }, 

      }
    });
  }
}
