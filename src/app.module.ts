import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './Task/task.module';
import { AuthModule } from './Auth/auth.module';
import { EmailModule } from './Email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/task-manager'),
    ConfigModule.forRoot({
      isGlobal: true, //make ConfigModule globally available
      envFilePath: '.env'
    }),
    AuthModule,
    EmailModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
