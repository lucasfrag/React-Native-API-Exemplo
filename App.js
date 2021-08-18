import React, { Component } from 'react'
import { ScrollView, View, Text, FlatList } from 'react-native'

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
    fetch ("https://pokeapi.co/api/v2/pokemon?limit=500&offset=200", 
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
      <ScrollView>
        <Text>PokéAPI Exemplo</Text>

        <FlatList 
          data={this.state.dados}
          renderItem={ Pokemons }
          key={item => item.name }
        />
      </ScrollView>
    )
  }
}

function Pokemons(item) {
  const { name, url } = item.item

  return(
    <View>
      <Text>Nome: {name}</Text>
      <Text>URL: {url}</Text>
    </View>
  )
}