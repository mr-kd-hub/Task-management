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
    @Body('dueDate') dueDate: string,
  ) {    
    if (!title) {
      return res.status(404).send({
        message: 'Invalid title',
      });
    }
    const task = await this.taskService.createTask(title, description, status, dueDate);
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
    @Body('search') search?: string,  // add search query here if needed  //
    @Body('sort') sort?: string,
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
    if(search !== undefined){
      query['search'] = search
    }
    const sortOption = sort === 'dueDate' ? { dueDate: -1 } : sort === 'title' ? { title: -1 } : { createdAt: -1 };
    const task = await this.taskService.getAllTasks({ ...query, sortOption });
    return res.status(200).send({
      task
    }); 
  }

  //manual testing pupose
  @Post('reminder')
  async sendReminder(
    @Body('email') email: string,
    @Body('taskTitle') taskTitle: string,
    @Body('dueDate') dueDate: string,
  ) {
    await this.taskService.sendTaskReminder(email, taskTitle, dueDate);
    return { message: 'Reminder email sent successfully!' };
  }
}
