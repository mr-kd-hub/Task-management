import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './Task/task.module';
import { EmailModule } from './Email/email.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/task-manager'),
    EmailModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
