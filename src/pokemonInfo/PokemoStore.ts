import { PokemonData } from './dtos/PokemonData'

export interface PokemonStore {
  getPokemonData: (id: number) => Promise<PokemonData>
  getPokemonFamilies: (id: number) => Promise<string[]>
  getPokemonCountries: (countries: string[]) => Promise<string[]>
}
