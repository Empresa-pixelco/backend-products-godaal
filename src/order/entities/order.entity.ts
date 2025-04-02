import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Branch } from '../../branch/entities/branch.entity';
import { CartItem } from '../../cart-item/entities/cart-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Branch, (branch) => branch.orders)
  branch: Branch;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];

  @Column('decimal')
  totalAmount: number; 

  @Column()
  status: string; 

  @Column({ nullable: true })
  whatsappMessage: string; 
}
