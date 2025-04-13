import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Branch } from '../../branch/entities/branch.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
