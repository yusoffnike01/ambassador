import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductCreateDto } from './dtos/product-create';
import { ProductService } from './product.service';

@Controller('admin/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async all() {
    return await this.productService.find({});
  }

  @Post('')
  async create(@Body() body: ProductCreateDto) {
    return await this.productService.save(body);
  }

  @Get('/:id')
  async get(@Param('id') id: number) {
    return await this.productService.findOne({ id });
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: ProductCreateDto) {
    await this.productService.update(id, body);
    return await this.productService.findOne({ id });
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.productService.delete(id);
  }
}
