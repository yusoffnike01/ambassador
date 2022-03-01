import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { LinkService } from './link.service';
import { Request } from 'express';
import { Order } from '../order/order';

@Controller('')
export class LinkController {
  constructor(
    private linkService: LinkService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('admin/users/:id/links')
  async all(@Param('id') id: number) {
    return await this.linkService.find({
      user: id,
      relations: ['orders'],
    });
  }

  @Post('ambassador/links')
  async create(@Body('products') products: number[], @Req() request: Request) {
    const user = await this.authService.user(request);
    return this.linkService.save({
      code: Math.random().toString(36).substring(6),
      user,
      products: products.map((id) => ({ id })),
    });
  }

  @UseGuards(AuthGuard)
  @Get('ambassador/stats')
  async stats(@Req() request: Request) {
    const user = await this.authService.user(request);
    const links = await this.linkService.find({ user });
    return links.map((link) => {
      const completedOrders: Order[] = link.orders.filter((o) => o.completed);
      return {
        code: link.code,
        count: completedOrders.length,
        revenue: completedOrders.reduce(
          (acc, o) => acc + o.ambassador_revenue,
          0,
        ),
      };
    });
  }

  @Get('checkout/link/:code')
  async link(@Param('code') code: string) {
    return await this.linkService.findOne({
      code,
      relations: ['user', 'products'],
    });
  }
}
