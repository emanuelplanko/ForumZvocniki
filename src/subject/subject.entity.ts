import {Post} from "../post/post.entity";
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";
import {Loudspeaker} from "../loudspeaker/loudspeaker.entity";

@Entity('subjects')
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(()=>Post, (post) => post.subject)
    posts: Post[];

    @OneToMany(()=>Loudspeaker, (loudspeaker) => loudspeaker.subject)
    loudspeakers: Loudspeaker[];
}