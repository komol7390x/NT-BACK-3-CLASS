import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar',unique:true})
    name:string

    @Column({type:'int',nullable:true})
    parent_id:number

}
