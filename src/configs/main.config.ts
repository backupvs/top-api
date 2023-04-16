import { INestApplication, ValidationPipe } from "@nestjs/common";

export function mainConfig(app: INestApplication) {
  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
}