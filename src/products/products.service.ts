import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  @InjectRepository(Product)
  private readonly repository: Repository<Product>;

  constructor(@Inject('PRODUCT_SERVICE') private clientProxy: ClientProxy) {}

  async create(createProductDto: CreateProductDto) {
    const product: Product = this.repository.create(createProductDto);
    await this.repository.save(product);

    await this.clientProxy.connect();
    this.clientProxy.emit('product-created', product);

    return product;
  }

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const product: Product = await this.repository.findOne(id);

    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    return await this.repository.findOne(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product: Product = await this.repository.findOne(id);

    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    await this.repository.update(id, updateProductDto);
    // fetch updated
    return await this.repository.findOne(id);
  }

  async remove(id: string) {
    const product: Product = await this.repository.findOne(id);

    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    return this.repository.softDelete(id);
  }

  async updateRating(id: string, ratting: number) {
    const product: Product = await this.repository.findOne(id);

    if (!product) {
      return false;
    }

    await this.repository.update(id, { rating: ratting });
  }
}
