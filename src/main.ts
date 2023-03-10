import { PrismaService } from '@config/prisma.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    const config = new DocumentBuilder()
        .setTitle('Ravn challenge')
        .setDescription('User and products endpoints')
        .setVersion('1.0')
        .addTag('Auth')
        .addTag('Product')
        .addTag('Cart')
        .addTag('Order')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
