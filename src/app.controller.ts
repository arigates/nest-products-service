import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
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
  async handleProductCreate(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(data);
    const param: any = JSON.parse(data);
    await this.productsService.updateRating(param.productId, +param.rating);
  }
}
