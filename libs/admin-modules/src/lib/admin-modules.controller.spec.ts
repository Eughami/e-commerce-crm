import { Test } from '@nestjs/testing';
import { AdminModulesController } from './admin-modules.controller';
import { AdminModulesService } from './admin-modules.service';

describe('AdminModulesController', () => {
  let controller: AdminModulesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AdminModulesService],
      controllers: [AdminModulesController],
    }).compile();

    controller = module.get(AdminModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
