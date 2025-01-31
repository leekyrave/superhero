import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateSuperheroDto } from 'src/superheroes/create-superhero.dto';

describe('SuperheroesController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Подключаем модуль приложения
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a superhero', async () => {
    const createSuperheroDto: CreateSuperheroDto = { name: 'Batman', superpower: "Test", humilityScore: 5};

    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(createSuperheroDto)
      .expect(201);

    expect(response.body.error).toBe(0);
    expect(response.body.message).toBe('Success');
  });

  it('should get all superheroes', async () => {
    const response = await request(app.getHttpServer())
      .get('/superheroes')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
