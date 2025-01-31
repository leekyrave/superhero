import { IsInt, IsString, Min, Max } from 'class-validator';
/**
 * DTO for superhero creation
 */
export class CreateSuperheroDto {
    @IsString()
    name: string;

    @IsString()
    superpower: string;

    @IsInt()
    @Min(1)
    @Max(10)
    humilityScore: number;
}