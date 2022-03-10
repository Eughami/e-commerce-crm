import { Test } from '@nestjs/testing';
import { AdminModulesService } from './admin-modules.service';

describe('AdminModulesService', () => {
  let service: AdminModulesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AdminModulesService],
    }).compile();

    service = module.get(AdminModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
