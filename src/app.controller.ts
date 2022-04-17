import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { ProductsService } from './products/products.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private productsService: ProductsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('product-rating-updated')
  async handleProductCreate(data: { productId: string; rating: string | number; }) {
    console.log(data);
    await this.productsService.updateRating(data.productId, +data.rating);
  }
}
