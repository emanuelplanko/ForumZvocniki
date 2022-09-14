import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Komentar} from "./komentar.entity";

@Injectable()
export class KomentarService {
    constructor(
        @InjectRepository(Komentar) private readonly komentarRepository: Repository<Komentar>
    ) {
    }

    getAll(): Promise<Komentar[]> {
        return this.komentarRepository.find();
    }

    create(data): Promise<Komentar> {
        return this.komentarRepository.save(data);
    }

    findOne(id: number): Promise<Komentar> {
        return this.komentarRepository.findOne({id});
    }

    async update(id:number,data): Promise<Komentar> {
        await this.komentarRepository.update(id,data);

        return this.findOne(id);
    }

    delete(id:number) {
        return this.komentarRepository.delete({id});
    }

    async getKoments(postId: number): Promise<Komentar[]> {
        return (await this.komentarRepository.find({where: { loudspeaker: postId }, order: {created_at:"ASC"}}));
    }

}
