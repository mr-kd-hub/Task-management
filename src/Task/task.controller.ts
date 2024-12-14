import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
  @Post()
  async createTask(
    @Res() res: any,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string,
  ) {
    if (!title || !description) {
      return res.status(404).send({
        message: 'Invalid title or description',
      });
    }
    const task = await this.taskService.createTask(title, description, status);
    return res.status(200).send({
      task
    }); 
  }

  @Patch(':id')
  async updateTask(
    @Res() res: any,
    @Param('id') id: string,
    @Body() dataToUpdate: any,
  ) {
    if (!id) {
      return res.status(404).send({
        message: 'Invalid id',
      });
    }
    console.log(":dataToUpdate",dataToUpdate);
    
    const task = await this.taskService.updateTask(id, dataToUpdate);
    return res.status(200).send({
      task
    });
  }

  @Delete(':id')
  async deleteTask(@Res() res: any, @Param('id') id: string) {
    if (!id) {
      return res.status(404).send({
        message: 'Invalid id',
      });
    }
    await this.taskService.deleteTask(id);
    return res.status(200).send({
      "message":"Task deleted successfully"
    });
  }

  @Get(':id')
  async getTask(@Res() res: any, @Param('id') id: string) {
    if (!id) {
      return res.status(404).send({
        message: 'Invalid id',
      });
    }
    const task = await this.taskService.getTask(id);
    return res.status(200).send({
      task
    });
  }

  @Post('/list')
  async getAllTasks(
    @Res() res: any,
    @Body('offset') offset?: number,
    @Body('limit') limit?: number,
    @Body('status') status?: string | undefined,
  ) {
    const query = {}
    if(offset !== undefined){
      query['offset'] = offset
    }
    if(limit !== undefined){
      query['limit'] = limit
    }
    if(status !== undefined){
      query['status'] = status
    }
    const task = await this.taskService.getAllTasks({ ...query });
    return res.status(200).send({
      task
    }); 
  }
}
