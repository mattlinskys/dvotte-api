import { Test, TestingModule } from '@nestjs/testing';
import { DevotesService } from './devotes.service';

describe('DevotesService', () => {
  let service: DevotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevotesService],
    }).compile();

    service = module.get<DevotesService>(DevotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
