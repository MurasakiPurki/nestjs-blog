import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PostWriteDto } from './blogpost/dto/blogpost.dto';
import { UserDto, UserAuthDto } from './user/dto/user.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NestJs Blog')
    .setDescription('Blog Rest Api with Nest.js + SQLite')
    .setVersion('1.0')
    .addTag('Blogpost', 'CRUD of Posts')
    .addTag('User', 'CRUD of Users')
    .addTag('Blog', 'Render blog page') //TODO:add Frontend
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT ' })
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PostWriteDto, UserAuthDto, UserDto],
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
