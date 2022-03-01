import { NestFactory } from '@nestjs/core';
import { User } from '../user/user';
import { AppModule } from '../app.module';
import { RedisService } from '../shared/redis.service';
import { UserService } from '../user/user.service';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  // application logic...

  const userService = app.get(UserService);
  const ambassador: User[] = await userService.find({
    is_ambassador: true,
    relations: ['orders', 'orders.order_items'],
  });

  const redisService = app.get(RedisService);
  const client = redisService.getClient();

  for (let i = 0; i < ambassador.length; i++) {
    client.zadd('rankings', ambassador[i].revenue, ambassador[i].name);
  }
  process.exit();
})();
