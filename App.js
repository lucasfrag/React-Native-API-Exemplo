import React, { Component } from 'react'
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import Pokemon from './src/Components/Pokemon';
import PokemonFiltrado from './src/Components/PokemonFiltrado';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carregando: false,
      dados: [], // Lista de Pokémons completa
      tipos: [], // Lista dos tipos
      tiposFiltrados: [] // Lista de Pokémons filtrados por tipo
    }
    this.getTipos()
    this.getPokemons()
    
  }

  render() {
    return (
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 24, margin: 10 }}>Pokedex</Text>
        <Text></Text>



        <ScrollView horizontal={true} style={{ height: 50, margin: 10 }}>
          <TouchableOpacity onPress={() => this.filtrar(0)}>
            <Text style={{ margin: 5, textTransform: 'capitalize' }}>Todos</Text>
          </TouchableOpacity>
          {
            this.state.tipos.map(
              item => (
                <TouchableOpacity onPress={() => this.filtrar(item.name)}>
                  <Text style={{ margin: 5, textTransform: 'capitalize' }}>{item.name}</Text>
                </TouchableOpacity>
              )
            )
          }
        </ScrollView>

        {
          this.state.carregando ? <ActivityIndicator size="large" color="#0000ff" /> : 
          this.listarPokemons()
        }

      </View>
    )
  }


  // Faz a requisição na API e guarda os dados retornados no state dados
  getPokemons = () => {
    this.setState({ carregando: true })
    fetch("https://pokeapi.co/api/v2/pokemon?limit=80",
      { method: "GET", headzers: { "Accept": "application/json" } }
    ).then(response => response.json())
      .then((dadosJson) => {
        this.setState({ carregando: false, dados: dadosJson.results })
      }).catch(error => console.log("Falha ao recuperar dados" + error))
  }

  getTipos = () => {
    this.setState({ carregando: true })
    fetch("https://pokeapi.co/api/v2/type",
      { method: "GET", headzers: { "Accept": "application/json" } }
    ).then(response => response.json())
      .then((dadosJson) => {
        this.setState({ carregando: false, tipos: dadosJson.results })
      }).catch(error => console.log("Falha ao recuperar dados" + error))
  }

  filtrar = (tipo) => {
    this.setState({ carregando: true })
    if (tipo != 0) {
      const url = "https://pokeapi.co/api/v2/type/" + tipo
      console.log(url)
      fetch(url,
        { method: "GET", headzers: { "Accept": "application/json" } }
      ).then(response => response.json())
        .then((dadosJson) => {
          this.setState({ carregando: false, tiposFiltrados: dadosJson.pokemon })
        }).catch(error => console.log("Falha ao recuperar dados" + error))
    } else {
      this.setState({carregando: false, tiposFiltrados:[] })
    }
  }

  /*  Com essa função, vamos verificar se temos Pokémons filtrados ou não.
      Se houver, mostrando os filtrados. Se não, voltamos a exibição da lista completa.
  */
  listarPokemons = () => {
    if (this.state.tiposFiltrados.length > 0) {
      return (
        <FlatList
          data={this.state.tiposFiltrados}
          renderItem={PokemonFiltrado}
          numColumns={2}
          initialNumToRender={15}
        />
      )
    } else {
      return (
        <FlatList
          data={this.state.dados}
          renderItem={Pokemon}
          key={item => item.name}
          numColumns={2}
          initialNumToRender={15}
        />
      )
    }
  }

  Pesquisar = (texto) => {
    this.setState({pesquisarTexto: texto});
  
    let filtro = this.state.dados.filter((item) => {
      return item.Digimon.toLowerCase().includes(texto.toLowerCase());
    });
  
    this.setState({dadosFiltrados: filtro});
  }

}