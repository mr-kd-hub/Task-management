import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' })
  status: string;

  @Prop({ default: false })
  is_delete: boolean;

  @Prop()
  dueDate: string;

  @Prop({ required: true })
  userId: string;
}
export type TaskDocument = Task & Document;
export const taskSchema = SchemaFactory.createForClass(Task);
