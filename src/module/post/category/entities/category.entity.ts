import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { BaseEntity } from 'src/interface/entity-interface';

@Entity('category')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @ManyToOne(() => Category, (category) => category.children, {
    nullable: true,
  })
  parent?: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
