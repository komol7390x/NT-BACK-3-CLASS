import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar',unique:true})
    name:string

    @Column({type:'int',nullable:true})
    parent_id:number

    @ManyToMany(()=>Category,(category)=>category.parent_id)
    parant_id:Category[]

    @OneToMany(()=>Category,(category)=>category.parant_id)
    parents:Category[]

    @OneToMany(()=>Product,(product)=>product.category_id)
    products:Product[]
}
