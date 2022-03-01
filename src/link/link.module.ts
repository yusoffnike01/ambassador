import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { Link } from './link';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link]), SharedModule, AuthModule],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
