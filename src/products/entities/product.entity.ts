import {
  Column,
  CreateDateColumn,
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

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt!: Date | null;
}
