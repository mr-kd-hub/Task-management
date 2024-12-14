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
  createTask(
    @Res() res: any,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string,
  ) {
    if (!title || !description) {
      return res.status(404).json({
        message: 'Invalid title or description',
      });
    }
    return this.taskService.createTask(title, description, status);
  }

  @Patch(':id')
  updateTask(
    @Res() res: any,
    @Param('id') id: string,
    @Body() dataToUpdate: any,
  ) {
    if (!id) {
      return res.status(404).json({
        message: 'Invalid id',
      });
    }
    return this.taskService.updateTask(id, dataToUpdate);
  }

  @Delete(':id')
  deleteTask(@Res() res: any, @Param('id') id: string) {
    if (!id) {
      return res.status(404).json({
        message: 'Invalid id',
      });
    }
    return this.taskService.deleteTask(id);
  }

  @Get(':id')
  getTask(@Res() res: any, @Param('id') id: string) {
    if (!id) {
      return res.status(404).json({
        message: 'Invalid id',
      });
    }
    return this.taskService.getTask(id);
  }

  @Post('/list')
  getAllTasks(
    @Body('offset') offset?: number,
    @Body('limit') limit?: number,
    @Body('status') status?: string | undefined,
  ) {
    return this.taskService.getAllTasks({ offset, limit, status });
  }
}
