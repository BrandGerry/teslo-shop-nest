import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //PONER API EN LOS ENDPOINTS
  app.setGlobalPrefix('api');
  //GLOBAL PIPES
  app.useGlobalPipes(
    new ValidationPipe({
      //PARA QUE SI MANDAS MAS VALORES EN EL BODY SALGA ERROR
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
      // transformOptions: {
      //   exposeUnsetFields: false,
      //   enableImplicitConversion: true,
      // },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
