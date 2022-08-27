import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { PostModule } from './post/post.module';
import { SubjectModule } from './subject/subject.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //importali smo ConfigModule.forRoot()
    //z importanjem ConfigModula sem povedal svoji aplikaciji da lahko sedaj bere iz spremenljivke .env
    ConfigModule.forRoot({isGlobal: true}), //ConfigModule.forRoot({isGlobal: true})-pomeni, da lahko tale ConfigModule uporabim tudi v ostalih modulih-prej smo dobili error
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      //ali ali
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT,10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [ ],
      synchronize: true,
    }),
    AuthModule,
    CommonModule,
    PostModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
