import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "../post/post.entity";
import {Loudspeaker} from "../loudspeaker/loudspeaker.entity";
import {Komentar} from "../komentar/komentar.entity";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(()=>Post,(post)=>post.user)
    //povezava na post.entity.ts
    posts: Post[];

    @OneToMany(()=>Loudspeaker,(loudspeaker)=>loudspeaker.user)
        //povezava na loudspeaker.entity.ts
    loudspeakers: Loudspeaker[];

   @OneToMany(()=>Komentar,(komentar)=>komentar.user)
        //povezava na loudspeaker.entity.ts
    komentarji: Komentar[];
}