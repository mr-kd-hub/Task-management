import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // origin: 'http://localhost:3001', // Allowed origin (frontend)
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    // credentials: true, // Allow cookies and credentials
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
