import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('admin/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('')
  async all() {
    return await this.orderService.find();
  }
}
