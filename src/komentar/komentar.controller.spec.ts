import { Test, TestingModule } from '@nestjs/testing';
import { KomentarController } from './komentar.controller';

describe('KomentarController', () => {
  let controller: KomentarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KomentarController],
    }).compile();

    controller = module.get<KomentarController>(KomentarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
