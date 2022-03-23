import { Test, TestingModule } from '@nestjs/testing';
import { RpcProviderService } from './rpc-provider.service';

describe('RpcProviderService', () => {
  let service: RpcProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RpcProviderService],
    }).compile();

    service = module.get<RpcProviderService>(RpcProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
