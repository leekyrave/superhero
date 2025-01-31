import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './create-superhero.dto';

@Controller('superheroes')
export class SuperheroesController {
    constructor(private readonly superheroesService: SuperheroesService) {}

    /**
     * /superheroes POST end-point
     * Creates hero
     */
    @Post()
    @HttpCode(201)
    @UsePipes(new ValidationPipe({whitelist: true}))
    async create(@Body() createSuperheroDto: CreateSuperheroDto) {
        await this.superheroesService.create(createSuperheroDto);
        
        return {
            error: 0,
            message: "Success"
        }
    }

    /**
     * /superheroes GET end-point
     * Returns all heroes
     */
    @Get()
    async findAll() {
        return await this.superheroesService.findAll();
    }
}
    