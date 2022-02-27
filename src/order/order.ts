import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './order-item';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  transaction_id: string;
  @Column()
  user_id: number;
  @Column()
  code: string;
  @Column()
  ambassador_email: string;
  @Exclude()
  @Column()
  first_name: string;
  @Exclude()
  @Column()
  last_name: string;
  @Column()
  email: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  country: string;
  @Column({ nullable: true })
  city: string;
  @Column({ nullable: true })
  zip: string;
  @Exclude()
  @Column({ default: false })
  complete: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_items: OrderItem[];

  @Expose()
  get name() {
    return `${this.first_name} ${this.last_name}`;
  }

  @Expose()
  get total() {
    return this.order_items.reduce((acc, cur) => acc + cur.admin_revenue, 0);
  }
}
