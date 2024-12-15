import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./task.model";
import { Model } from "mongoose";
import { ReminderService } from "src/Reminder/reminder.service";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>, private readonly reminderService: ReminderService) {}

  async createTask(
    title: string,
    description: string,
    status: string,
    dueDate?: string 
  ): Promise<Task> {
    const model = new this.taskModel();
    model.title = title;
    model.description = description;
    model.status = status;
    model.dueDate = dueDate;
    
    return await model.save();
  }

  async updateTask(id: string, dataToUpdate: any): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(
      id,
      { ...dataToUpdate },
      { new: true },
    );
  }

  async deleteTask(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, { is_delete: true });
  }

  async getTask(id: string): Promise<Task> {
    return await this.taskModel.findById(id);
  }

  async getAllTasks(data: {
    offset?: number;
    limit?: number;
    status?: string;
    search?: string;
    sortOption: any
  }): Promise<Task[]> {
    const { offset, limit, status, search, sortOption } = data;
    const query = { is_delete: false };
    if (status !== undefined) {
      query['status'] = status;
    }
    if (search !== undefined) query['title'] = { $regex: search, $options: 'i' };
    return await this.taskModel
      .find({ ...query })
      .sort(sortOption)
      .skip(offset)
      .limit(limit);
  }

  async sendTaskReminder(email: string, taskTitle: string, dueDate: string): Promise<void> {
    const subject = `Reminder: Task "${taskTitle}" is due soon!`;
    const text = `Hello,\n\nThis is a friendly reminder that your task "${taskTitle}" is due on ${dueDate}.\n\nBest regards,\nTask Management App`;
    await this.reminderService.sendEmail(email, subject, text);
  }
}