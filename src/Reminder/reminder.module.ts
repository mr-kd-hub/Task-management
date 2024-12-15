import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './email.processor'
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email', //queue name
    }),
  ],
  providers: [EmailProcessor, EmailService],
  exports: [BullModule],
})
export class ReminderModule {}
