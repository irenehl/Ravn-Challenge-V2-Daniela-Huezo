import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';

@Module({
    providers: [AppService],
    imports: [
        AuthModule,
        UserModule,
        ProductModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [AppController],
})
export class AppModule {}
