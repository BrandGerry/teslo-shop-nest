import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

//REPRESENTACION DE ESTO EN BD
@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  url!: string;
  //RELACION
  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
