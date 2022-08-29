import { Test, TestingModule } from '@nestjs/testing';
import { LoudspeakerService } from './loudspeaker.service';

describe('LoudspeakerService', () => {
  let service: LoudspeakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoudspeakerService],
    }).compile();

    service = module.get<LoudspeakerService>(LoudspeakerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
