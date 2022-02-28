import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6378,
    }),
  ],
  exports: [JwtModule],
})
export class SharedModule {}
