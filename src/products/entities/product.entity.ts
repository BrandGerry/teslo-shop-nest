import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';

//REPRESENTACION DE ESTO EN BD
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text', {
    unique: true,
  })
  title!: string;

  @Column('float', {
    default: 0,
  })
  price!: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description!: string;

  @Column({
    type: 'text',
    unique: true,
  })
  slug!: string;

  @Column({
    type: 'int',
    default: 0,
  })
  stock!: number;

  @Column('text', {
    array: true,
  })
  sizes!: string[];

  @Column('text')
  gender!: string;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags!: string[];

  //RELACION ENTRE UNA TABLA Y OTRA PRODUCT.ENTITY Y PRODUCT IMAGE ENTITY
  //Una a muchas
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
    //aqui para que en el findone al momento de hacer la consulta nos salga mas facil las imges
  })
  images?: ProductImage[];

  //ANTES DE INSERTAR PARA VALDAR SLUG
  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
