import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

export default function PokemonFiltrado(pokemon) {

    // Extrai dados de apenas 1 Pokemon da lista
    const { name, url } = pokemon.item.pokemon
    const numeroDoPokemon = url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
    const imagem = 'https://img.pokemondb.net/sprites/home/normal/' + name + '.png'

    return (
        <View
            style={
                {
                    backgroundColor: 'black',
                    margin: 4,
                    borderRadius: 10,
                    flex: 1,
                    flexDirection: 'row',
                    padding: 6,
                    height: 60
                }
            }>

            <View style={{ flex: 1 }}>
                <Text style={{
                    fontSize: 14,
                    textTransform: "capitalize",
                    color: 'white',
                    fontWeight: 'bold'
                }}
                >{name}</Text>

                <Text style={{ color: 'white', fontSize: 10, alignContent: "flex-end" }}>N° {numeroDoPokemon}</Text>

            </View>
            <Image
                source={require('../Images/pokeball.png')}
                style={{ width: 60, height: 60, opacity: 0.5, tintColor: "#e6e6e6", position: 'absolute', right: 5, zIndex: -10 }}
            />

            <Image style={{ width: 50, height: 50 }} source={{ uri: imagem }}></Image>
        </View>
    )
}
