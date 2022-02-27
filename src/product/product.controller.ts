import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductCreateDto } from './dtos/product-create';
import { ProductService } from './product.service';

@Controller('admin/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async all() {
    return await this.productService.find();
  }

  @UseGuards(AuthGuard)
  @Post('')
  async create(@Body() body: ProductCreateDto) {
    return await this.productService.save(body);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async get(@Param('id') id: number) {
    return await this.productService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: ProductCreateDto) {
    await this.productService.update(id, body);
    return await this.productService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.productService.delete(id);
  }
}
