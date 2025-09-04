import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entities/category.entity";

@Entity('product')
export class Product {
        @PrimaryGeneratedColumn()
        id:number
    
        @Column({type:'varchar',unique:true})
        name:string
    
        @Column({type:'decimal'})
        price:number

        @Column({type:'int'})
        category_id:number

        @ManyToMany(()=>Category,(category)=>category.id)
        categorys:Category[]
}
