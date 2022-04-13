import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  public buyPrice: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  public sellPrice: number;

  @Column({ type: 'varchar', length: 25, default: 'active' })
  public status: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn()
  public deletedAt!: Date | null;
}
