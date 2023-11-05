import { PokemonStore } from './PokemoStore'
import { Move } from './dtos/PokemonData'
import { ResponseDTO } from './dtos/ResponseDTO'

export const getPokemon = async (
  id: number, { getPokemonData, getPokemonCountries, getPokemonFamilies }: PokemonStore
) => {
  const pokemon = await getPokemonData(id)
  const family = await getPokemonFamilies(id)
  const country = await getPokemonCountries(family)

  const filteredPokemonMoveSet = () => {
    const result: Move[] = pokemon.moves.sort((a, b) => b.level - a.level)

    return result.slice(0, 4)
  }

  const pokemonData: ResponseDTO = {
    baseInformation: pokemon,
    families: family,
    countries: country,
    moveSet: filteredPokemonMoveSet()
  }
  return pokemonData
}
