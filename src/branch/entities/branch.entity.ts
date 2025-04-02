import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Veterinary } from '../../veterinary/entities/veterinary.entity';
import { Product } from '../../product/entities/product.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contact: string;

  @Column()
  location: string;
  
  @Column()
  whatsappNumber: string; 

  @ManyToOne(() => Veterinary, (veterinary) => veterinary.branches)
  veterinary: Veterinary;

  @OneToMany(() => Product, (product) => product.branch)
  products: Product[];

  @OneToMany(() => Order, (order) => order.branch)
  orders: Order[];
}
