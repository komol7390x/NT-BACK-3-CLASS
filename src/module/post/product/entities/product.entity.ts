import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { BaseEntity } from 'src/interface/entity-interface';

@Entity('product')
export class Product extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Category, (category) => category.products, {
    // cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;
}
