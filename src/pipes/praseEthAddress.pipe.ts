import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isEthereumAddress } from 'class-validator';

@Injectable()
export class PraseEthAddressPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value !== undefined && !isEthereumAddress(value)) {
      throw new BadRequestException(
        `'${metadata.data}' must be an ethereum address`,
      );
    }

    return value;
  }
}
