import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class Product {
        @PrimaryGeneratedColumn()
        id:number
    
        @Column({type:'varchar',unique:true})
        name:string
    
        @Column({type:'decimal'})
        price:number

        @Column({type:'int'})
        product_id:number
}
