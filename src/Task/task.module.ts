import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, taskSchema } from "./task.model";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { ReminderModule } from "src/Reminder/reminder.module";

@Module({
    imports:[MongooseModule.forFeature([{
        name:Task.name,
        schema:taskSchema
      }]),
      ReminderModule
    ],
      controllers: [TaskController],
      providers: [TaskService],
})
export class TaskModule {}
