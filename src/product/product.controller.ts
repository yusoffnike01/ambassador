import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductCreateDto } from './dtos/product-create';
import { ProductService } from './product.service';
import { Cache } from 'cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private eventEmitter: EventEmitter2,
  ) {}

  @UseGuards(AuthGuard)
  @Get('admin/product')
  async all() {
    return await this.productService.find();
  }

  @UseGuards(AuthGuard)
  @Post('admin/product')
  async create(@Body() body: ProductCreateDto) {
    const product = await this.productService.save(body);
    this.eventEmitter.emit('product_updated');
    return product;
  }

  @UseGuards(AuthGuard)
  @Get('admin/product/:id')
  async get(@Param('id') id: number) {
    return await this.productService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Put('admin/product/:id')
  async update(@Param('id') id: number, @Body() body: ProductCreateDto) {
    await this.productService.update(id, body);
    this.eventEmitter.emit('product_updated');
    return await this.productService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Delete('admin/product/:id')
  async delete(@Param('id') id: number) {
    const response = await this.productService.delete(id);
    this.eventEmitter.emit('product_updated');
    return response;
  }

  @CacheKey('product_frontend')
  @CacheTTL(30 * 60)
  @UseInterceptors(CacheInterceptor)
  @Get('ambassador/product/frontend')
  async frontend() {
    return this.productService.find();
  }

  @Get('ambassador/product/backend')
  async backend() {
    let products = await this.cacheManager.get('product_backend');
    if (!products) {
      products = await this.productService.find();
      await this.cacheManager.set('product_backend', products, { ttl: 1800 });
    }
    return products;
  }
}
