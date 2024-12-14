import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./task.model";
import { Model } from "mongoose";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  createTask(
    title: string,
    description: string,
    status: string,
  ): Promise<Task> {
    const model = new this.taskModel();
    model.title = title;
    model.description = description;
    model.status = status;
    return model.save();
  }

  updateTask(id: string, dataToUpdate: TaskDocument): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(
      id,
      { ...dataToUpdate },
      { new: true },
    );
  }

  deleteTask(id: string): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, { is_delete: true });
  }

  getTask(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }

  getAllTasks(data: {
    offset: number;
    limit: number;
    status: string | undefined;
  }): Promise<Task[]> {
    const { offset, limit = 10, status } = data;
    const query = { is_delete: false };
    if (status !== undefined) {
      query['status'] = status;
    }
    return this.taskModel
      .find({ ...query })
      .skip(offset)
      .limit(limit);
  }
}