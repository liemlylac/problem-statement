import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const documentBuilder = new DocumentBuilder()
    .setTitle(config.get('npm_package_name'))
    .setDescription(config.get('npm_package_description'))
    .setLicense(config.get('npm_package_license'), `https://github.com/liemlylac/${config.get('npm_package_name')}/blob/main/LICENSE`)
    .setContact(config.get('npm_package_author_name'),'https://github.com/liemlylac','liemlylac@gmail.com')
    .setVersion(config.get('npm_package_version'))
    .addBearerAuth({ type: 'http', description: 'Authentication with JWT'})
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document);

  await app.listen(+config.get('APP_PORT'));
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
