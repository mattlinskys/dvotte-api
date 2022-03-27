import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value !== undefined && !ObjectId.isValid(value)) {
      throw new BadRequestException(`'${metadata.data}' must be an object id`);
    }

    return value;
  }
}
