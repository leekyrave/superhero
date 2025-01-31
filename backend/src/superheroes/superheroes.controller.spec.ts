import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './create-superhero.dto';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;
  const mockData = {
    create: jest.fn().mockResolvedValue({name: "Elon Musk", superpower: "Philanthropist", humilityScore: 2}),
    findAll: jest.fn().mockResolvedValue([
      {name: "Evgeniy Tapochkin", superpower: "Teleportation", humilityScore: 5},
      {name: "Elon Musk", superpower: "Philanthropist", humilityScore: 2}
    ])
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [SuperheroesService, {
        provide: SuperheroesService,
        useValue: mockData
      }]
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  describe('create', () => {
    it('should call superheroesService.create and return a success message', async () => {
      const superhero: CreateSuperheroDto = {name: "Elon Musk", superpower: "Philanthropist", humilityScore: 2}

      const response = await controller.create(superhero);
      expect(service.create).toHaveBeenCalledWith(superhero);
      expect(response).toEqual({
        error: 0,
        message: "Success"
      })
    })
  })
});
