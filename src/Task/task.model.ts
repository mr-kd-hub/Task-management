import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema()
export class Task {
    @Prop({required:true})
    title: string;

    @Prop()
    description: string;
    
    @Prop({ enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' })
    status: string;
}
export type BookDocument = Task & Document
export const bookSchema = SchemaFactory.createForClass(Task)
