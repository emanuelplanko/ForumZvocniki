import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../user/user.entity";
import {Loudspeaker} from "../loudspeaker/loudspeaker.entity";
import {IsNotEmpty} from "class-validator";


@Entity('komentarji')
export class Komentar {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    komentar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=>User, (user) => user.komentarji,{eager:true})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(()=>Loudspeaker, (loudspeaker) => loudspeaker.komentarji,{eager:true})
    @JoinColumn({name: 'loudspeaker_id'})
    loudspeaker: Loudspeaker;
}