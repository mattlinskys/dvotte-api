import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SUPPORTED_CHAINS } from 'constants/chains.constants';
import { providers } from 'ethers';
import { IChain } from 'types/chain.type';

@Injectable()
export class RpcProviderService {
  private providers: Record<IChain['id'], providers.JsonRpcProvider> = {};

  constructor(private readonly configService: ConfigService) {}

  getProvider(chainId: IChain['id']) {
    if (chainId in this.providers) {
      return this.providers[chainId];
    }

    const chain = SUPPORTED_CHAINS[chainId];
    if (!chain) {
      throw new Error(`Missing chain, id: ${chainId}`);
    }

    const provider = new providers.JsonRpcProvider(
      chain.rpcUrls[0].replace(
        '${INFURA_API_KEY}',
        this.configService.get('rpc.infuraApiKey'),
      ),
    );
    this.providers[chainId] = provider;

    return provider;
  }
}
