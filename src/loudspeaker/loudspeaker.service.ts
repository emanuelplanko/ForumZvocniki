import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Loudspeaker} from "./loudspeaker.entity";

@Injectable()
export class LoudspeakerService {
    constructor(@InjectRepository(Loudspeaker) private readonly loudspeakerRepository: Repository<Loudspeaker>) {
    }

    getAll(): Promise<Loudspeaker[]> {
        return this.loudspeakerRepository.find();
    }

    findOne(id:number): Promise<Loudspeaker> {
        return this.loudspeakerRepository.findOne({id});
    }

    create(data): Promise<Loudspeaker> {
        return this.loudspeakerRepository.save(data);
    }

    delete(id:number) {
        this.loudspeakerRepository.delete({id});
    }

    async update(id:number, data): Promise<Loudspeaker> {
        await this.loudspeakerRepository.update(id, data);
        return this.findOne(id);
    }





}
