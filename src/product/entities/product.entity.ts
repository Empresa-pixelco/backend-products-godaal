import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Branch } from '../../branch/entities/branch.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @Column()
  status: string; 

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => Branch, (branch) => branch.products)
  branch: Branch;
  
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
