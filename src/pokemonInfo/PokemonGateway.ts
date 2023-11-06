import { PokemonStore } from './PokemoStore'
import { mapToPokemonDto } from './utils/mapToPokemonDataDto'
import { runQuery } from '../db'

export const pokemonGateway: PokemonStore = {
  getPokemonData: async (id: number) => {
    try {
      const path = `https://pokeapi.co/api/v2/pokemon/${id}`
      return await fetch(path)
        .then(async (res) => await res.json())
        .then(mapToPokemonDto)
    } catch (error) {
      throw new Error('Pokemon not found')
    }
  },
  getPokemonFamilies: async (id: number) => {
    const query: string = `
        SELECT f.*
        FROM family f
        JOIN family_pokemon fp ON f.id = fp.family_id
        WHERE fp.pokemon_id = $id;
    `
    const params = { id }
    try {
      const response = await runQuery(query, params)
      return response.results
    } catch (error) {
      throw new Error('Pokemon family not found')
    }
  },
  getPokemonCountries: async (countries: any[]) => {
    const query: string = `
      SELECT z.*, fz.probability
      FROM zone z
      JOIN family_zone fz ON z.id = fz.zone_id
      WHERE fz.family_id IN ($firstFamilyId, $secondFamilyId);
    `
    const firstFamilyId = countries[0].id
    const secondFamilyId = countries.length > 1 ? countries[1].id : ''
    const params = { firstFamilyId, secondFamilyId }
    try {
      const response = await runQuery(query, params)
      return response.results
    } catch (error) {
      throw new Error('Pokemon country not found')
    }
  }
}
