import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RpcProviderService } from './rpc-provider.service';

@Module({
  imports: [ConfigModule],
  providers: [RpcProviderService],
  exports: [RpcProviderService],
})
export class RpcProviderModule {}
