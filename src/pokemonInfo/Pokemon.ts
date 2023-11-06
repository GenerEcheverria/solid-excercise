import { PokemonStore } from './PokemoStore'
import { Move } from './dtos/PokemonData'
import { ResponseDTO } from './dtos/ResponseDTO'

export const getPokemon = async (
  id: number, { getPokemonData, getPokemonCountries, getPokemonFamilies }: PokemonStore
) => {
  const pokemon = await getPokemonData(id)
  const families = await getPokemonFamilies(id)
  const countries = await getPokemonCountries(families)

  const filteredMovesetPokemon = () => {
    const result: Move[] = pokemon.moves.sort((a, b) => b.level - a.level)
    pokemon.moves = result.slice(0, 4)
    return pokemon
  }

  const filteredPokemonCountries = () => {
    countries.sort((a, b) => parseInt(b[2]) - parseInt(a[2]))
    return countries.slice(0, 3)
  }

  const pokemonData: ResponseDTO = {
    baseInformation: filteredMovesetPokemon(),
    families,
    countries: filteredPokemonCountries()
  }
  return pokemonData
}
