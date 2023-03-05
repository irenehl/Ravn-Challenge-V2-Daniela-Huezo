import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { ProductService } from './product/product.service';
import { ProdcutService } from './prodcut/prodcut.service';
import { UserController } from './user/user.controller';
import { UsersService } from './users/users.service';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, UsersService, ProdcutService, ProductService],
})
export class AppModule {}
