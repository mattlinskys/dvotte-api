import { Expose } from 'class-transformer';

export class MultiResults<T> {
  @Expose()
  results: T[];

  @Expose()
  total: number;
}
