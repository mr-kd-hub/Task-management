import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from '../email/email.service';

@Processor('email')
export class EmailProcessor {
  constructor(private readonly emailService: EmailService) {}

  @Process() // This will process jobs in the queue
  async handleEmailReminder(job: Job) {
    const { email, title, dueDate } = job.data;

    await this.emailService.sendEmail(
      email,
      `Reminder: Task "${title}" is due today!`,
      `Hello,\n\nYour task "${title}" is due on ${dueDate}. Please ensure it is completed.\n\nBest regards,\nTask Management App`,
    );
    console.log(`Reminder email sent for task "${title}" to ${email}`);
  }
}
