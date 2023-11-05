import { Router } from 'express'
import { pokemonGateway } from './pokemonInfo/PokemonGateway'
import { getPokemon } from './pokemonInfo/Pokemon'

const InfoRouter = Router()

InfoRouter.get('/info/:id', (httpRequest, httpResponse) => {
  const pokemonId: number = parseInt(httpRequest.params.id)
  const store = pokemonGateway
  getPokemon(pokemonId, store)
    .then((pokemons: any) => {
      httpResponse.send(pokemons)
    })
    .catch((Error) => {
      httpResponse.status(500).send('Can not get response')
    })
})
InfoRouter.get('*', (_, res) => res.status(404).send('Not found'))

export default InfoRouter
