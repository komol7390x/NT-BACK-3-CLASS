import { Module } from '@nestjs/common';
import { ProductModule } from './module/post/product/product.module';
import { CategoryModule } from './module/post/category/category.module';
import { AdminModule } from './module/user/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './database/database';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'.env'
  }),
  TypeOrmModule.forRoot({
    type:'postgres',
    url:String(process.env.DB_URL),
    synchronize:true,
    autoLoadEntities:true,
    entities:[]
  }),
  ProductModule,
   CategoryModule,
    AdminModule],
  providers:[AppService]
},
)
export class AppModule {}
