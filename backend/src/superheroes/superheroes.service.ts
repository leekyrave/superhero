import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './create-superhero.dto';

@Injectable()
export class SuperheroesService {
    private superheroes: CreateSuperheroDto[] = [];
    /**
     * Create service
     */
    async create(superhero: CreateSuperheroDto): Promise<Boolean> {
        if (this.superheroes.some(hero => hero.name.toLowerCase() === superhero.name.toLowerCase())) {
            throw new ConflictException(`Superhero with name "${superhero.name}" already exists`)
        }
        this.superheroes.push(superhero);
        return true;
    }

    /**
     * Findall service
     */
    async findAll(): Promise<CreateSuperheroDto[]> {
        return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
    }
}
