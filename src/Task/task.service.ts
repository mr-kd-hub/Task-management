import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./task.model";
import { Model } from "mongoose";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(
    title: string,
    description: string,
    status: string,
  ): Promise<Task> {
    const model = new this.taskModel();
    model.title = title;
    model.description = description;
    model.status = status;
    
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
  }): Promise<Task[]> {
    const { offset, limit, status, search } = data;
    const query = { is_delete: false };
    if (status !== undefined) {
      query['status'] = status;
    }
    if (search !== undefined) query['title'] = { $regex: search, $options: 'i' };
    return await this.taskModel
      .find({ ...query })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
  }
}