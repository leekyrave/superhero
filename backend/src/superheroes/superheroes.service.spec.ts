import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './create-superhero.dto';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroesService],
    }).compile();

    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new superhero and store it in the array', async () => {
    const createSuperheroDto: CreateSuperheroDto = {
      name: "Evgeniy Tapochkin",
      superpower: "Teleportation",
      humilityScore: 1
    };

    await service.create(createSuperheroDto);

    const superheroes = await service.findAll();

    expect(superheroes).toHaveLength(1);
    expect(superheroes[0]).toEqual(createSuperheroDto);
  });

  it('should sort superheroes by humility score in descending order', async () => {
    const superheroes: CreateSuperheroDto[] = [
      {name: "Evgeniy Tapochkin", superpower: "Teleportation", humilityScore: 5},
      {name: "Elon Musk", superpower: "Philanthropist", humilityScore: 2},
    ]

    for (const superhero of superheroes) {
      await service.create(superhero)
    }

    const superheroesAfterInjection = await service.findAll();

    expect(superheroesAfterInjection[0].humilityScore).toBeGreaterThan(superheroesAfterInjection[1].humilityScore);
  })
});