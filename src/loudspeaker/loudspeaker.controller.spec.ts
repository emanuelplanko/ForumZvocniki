import { Test, TestingModule } from '@nestjs/testing';
import { LoudspeakerController } from './loudspeaker.controller';

describe('LoudspeakerController', () => {
  let controller: LoudspeakerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoudspeakerController],
    }).compile();

    controller = module.get<LoudspeakerController>(LoudspeakerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
