import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //iz nest spletne strani-useGlovalPipes
  app.useGlobalPipes(new ValidationPipe());
  //cookieParser smo importali za cookie-zgoraj in spodaj
  app.use(cookieParser());
  //enableCors-če obstaja cookie ga bo zmeraj poslalo
  app.enableCors( {
    origin: 'https://localhost:3000',
    credentials: true
  })
  await app.listen(3000);
}
bootstrap();
