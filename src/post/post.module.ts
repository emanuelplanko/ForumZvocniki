import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "./post.entity";
import {CommonModule} from "../common/common.module";

@Module({
  //importali smo enako kot v prejšnjem modulu
  imports: [
      TypeOrmModule.forFeature([Post]),
      CommonModule
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
