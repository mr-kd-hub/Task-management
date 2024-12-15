import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './Task/task.module';
import { ReminderModule } from './Reminder/reminder.module';
// mongodb://localhost:27017
// mongodb+srv://admin:admin@cluster0.hwuu13w.mongodb.net/task-manager
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/task-manager'),
    ReminderModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
