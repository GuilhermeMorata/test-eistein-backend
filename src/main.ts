declare const module: any;
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { log } from 'console';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/middleware/error.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Test Einstein')
    .setDescription('system Api')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('API', app, document);

  app.enableCors();
  const http_adapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(http_adapter));

  await app.listen(process.env.PORT, () => {
    log(`Start Api server: http://localhost:${process.env.PORT}/API#`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();