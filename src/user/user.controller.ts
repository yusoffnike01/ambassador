import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RedisService } from '../shared/redis.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private redisService: RedisService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('admin/ambassadors')
  ambassadors() {
    return this.userService.find({ is_ambassador: true });
  }

  @Get('ambassador/rakings')
  async rakings(@Res() response: Response) {
    const client = this.redisService.getClient();
    client.zrevrangebyscore(
      'rankings',
      '+inf',
      '-inf',
      'WITHSCORES',
      (err, result) => {
        let score;
        response.send(
          result.reduce((o, r) => {
            if (isNaN(parseInt(r))) {
              return {
                ...o,
                [r]: score,
              };
            } else {
              score = parseInt(r);
              return o;
            }
          }, {}),
        );
      },
    );
  }
}
