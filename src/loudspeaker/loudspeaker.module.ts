import { Module } from '@nestjs/common';
import { LoudspeakerController } from './loudspeaker.controller';
import { LoudspeakerService } from './loudspeaker.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommonModule} from "../common/common.module";
import {Loudspeaker} from "./loudspeaker.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Loudspeaker]),
    CommonModule
  ],
  controllers: [LoudspeakerController],
  providers: [LoudspeakerService]
})
export class LoudspeakerModule {}
