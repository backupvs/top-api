import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mainConfig } from './configs/main.config';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  mainConfig(app);

  await app.listen(port);
  console.log(`Listening on ${port}`);
}
bootstrap();
