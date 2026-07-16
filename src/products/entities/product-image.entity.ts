import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

//REPRESENTACION DE ESTO EN BD
@Entity({ name: 'products_images' })
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  url!: string;
  //RELACION
  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
