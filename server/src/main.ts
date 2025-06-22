import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { CORS_OPTIONS } from './cores/cors.config';
import { setupSwagger } from './cores/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: ["health", "docs"],
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  app.enableCors(CORS_OPTIONS);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);

  await app.listen(process.env?.APP_PORT ?? 8000);
}

bootstrap();
