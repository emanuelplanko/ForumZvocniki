import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {IsNotEmpty} from "class-validator";
import {User} from "../user/user.entity";
import {Komentar} from "../komentar/komentar.entity";



@Entity('loudspeakers')
export class Loudspeaker {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    model_name: string;

    @Column()
    description: string;

    @Column()
    company: string;

    @Column()
    frequency_range: string;

    @Column()
    sensitivity: string;

    @Column()
    refractive_frequency: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=>User, (user) => user.loudspeakers,{eager:true})
    @JoinColumn({name: 'user_id'})
        //povezava do user.entity.ts
    user: User;

   @OneToMany(()=>Komentar,(komentar)=>komentar.loudspeaker)
        //povezava na loudspeaker.entity.ts
    komentarji: Komentar[];


}