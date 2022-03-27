import { Test, TestingModule } from '@nestjs/testing';
import { DevotesController } from './devotes.controller';
import { DevotesService } from './devotes.service';

describe('DevotesController', () => {
  let controller: DevotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevotesController],
      providers: [DevotesService],
    }).compile();

    controller = module.get<DevotesController>(DevotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
