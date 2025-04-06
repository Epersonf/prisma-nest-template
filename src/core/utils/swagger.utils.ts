import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerUtils {
  static setupSwagger(app: NestExpressApplication) {
    const config = new DocumentBuilder()
      .setTitle('Template API');

    config.addServer('http://localhost:3000/', 'local');

    const document = SwaggerModule.createDocument(app, config.build());
    SwaggerModule.setup('swagger', app, document);
  }
}