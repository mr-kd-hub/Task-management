import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./task.model";
import { Model } from "mongoose";
import { EmailService } from "src/Email/email.service";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from 'bull';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectQueue('email') private readonly reminderQueue: Queue,
    private readonly emailService: EmailService,
  ) {}

  async createTask(
    title: string,
    description: string,
    status: string,
    dueDate?: string,
  ): Promise<Task> {
    const model = new this.taskModel();
    model.title = title;
    model.description = description;
    model.status = status;
    model.dueDate = dueDate;

    await model.save();
    try{
      if(dueDate) this.createReminder(dueDate,title)
    }
    catch(err){
      console.log("error in remindrr setup",err);   
    }
    return model;
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
    sortOption: any;
  }): Promise<Task[]> {
    const { offset, limit, status, search, sortOption } = data;
    const query = { is_delete: false };
    if (status !== undefined) {
      query['status'] = status;
    }
    if (search !== undefined)
      query['title'] = { $regex: search, $options: 'i' };
    return await this.taskModel
      .find({ ...query })
      .sort(sortOption)
      .skip(offset)
      .limit(limit);
  }

  async createReminder(dueDate, title){
    console.log("st1",dueDate);    
    const dueDateTime = new Date(dueDate).getTime();
    console.log("st2",dueDateTime);
    const now = Date.now();
    console.log("st3",now, dueDateTime > now);
    if (dueDateTime > now) {
      try {
        console.log("st3.1",title);
        await this.reminderQueue.add(
          {
            email: "dhruvkoladiya456@gmail.com",
            title,
            dueDate,
          },
          {
            delay: dueDateTime - now, //milliseconds
          },
        );
      }catch(err){
        console.log("st3.2",err);
      }
      
      console.log(`st3.2 Reminder scheduled for task "${title}" at ${dueDate}`);
    }
  }

  async sendTaskReminder(
    email: string,
    taskTitle: string,
    dueDate: string,
  ): Promise<void> {
    const subject = `Reminder: Task "${taskTitle}" is due soon!`;
    const text = `Hello,\n\nThis is a friendly reminder that your task "${taskTitle}" is due on ${dueDate}.\n\nBest regards,\nTask Management App`;
    await this.emailService.sendEmail(email, subject, text);
  }
}