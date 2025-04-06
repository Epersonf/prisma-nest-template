import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerUtils } from './core/utils/swagger.utils';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const server = express();
  const adapter = new ExpressAdapter(server);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: false,
      whitelist: true,
      forbidUnknownValues: false,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), {
    ignoreDecorators: false,
    enableImplicitConversion: true
  }));
  
  app.enableCors();
  app.init();

  SwaggerUtils.setupSwagger(app);

  return server;
}

bootstrap().then((server) => server.listen(3000));

export default bootstrap;