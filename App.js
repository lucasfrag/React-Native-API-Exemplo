import React, { Component } from 'react'
import { ScrollView, View, Text, FlatList, Image, StyleSheet } from 'react-native'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carregando: false,
      dados: []
    }
  }


  recuperarDados() {
    this.setState({carregando: true})
    fetch ("https://pokeapi.co/api/v2/pokemon?limit=80", 
      { method:"GET", headzers: { "Accept": "application/json"  } }
    ) .then(response => response.json())
      .then( (dadosJson) => {
        this.setState({ carregando: false, dados: dadosJson.results })
        console.log("Dados recuperados com sucesso!")
        console.log(this.state.dados)
      }).catch(error => console.log("Falha ao recuperar dados" + error))
    }

    componentDidMount() {
      this.recuperarDados()
    }

 
  render() {

    return(
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 24, margin: 10 }}>Pokedex</Text>
      
      <View>

        <FlatList 
          data={this.state.dados}
          renderItem={ Pokemons }
          key={item => item.name }
          numColumns={2}
        />
      </View>
      </View>
    )
  }
}

function Pokemons(pokemon) {

  const { name, url, types } = pokemon.item
  const numeroDoPokemon = url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
  const imagem = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+numeroDoPokemon+'.png'
  console.log(name)

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  return(
    <View 
      style={
        {
          backgroundColor: generateColor(),
          margin: 4,
          borderRadius: 10,
          flex: 1,
          flexDirection: 'row',
          padding: 6,
        }
      }>

      <View style={{flex: 1}}>
        <Text style={{    
          fontSize: 14,
          textTransform: "capitalize",
          color: 'white',
          fontWeight: 'bold'
          }}
        >{name}</Text> 
        
        <Text style={{color: 'white', fontSize: 10, alignContent:"flex-end"}}>#{numeroDoPokemon}</Text>  
  
      </View>
      <Image
        source={require('./src/images/pokeball.png')}
        style={{width: 50, height: 50, tintColor: "#e0d5d5", position: 'absolute', top: 5, left: 50, zIndex: -10 }}
      />
      <Image style={{width: 50, height: 50}} source={{uri:imagem}}></Image>
      
    </View>
  )
}

const style = StyleSheet.create({
  name: {
    fontSize: 14,
    textTransform: "capitalize",
    color: 'white',
    fontWeight: 'bold'
  }

})