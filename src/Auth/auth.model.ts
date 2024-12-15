import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Auth {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  avatarUrl?: string

  @Prop({ default: false })
  is_delete: boolean;

}
export type AuthDocument = Auth & Document;
export const authSchema = SchemaFactory.createForClass(Auth);