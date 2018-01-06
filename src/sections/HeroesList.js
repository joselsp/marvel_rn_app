import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios'
import { fetchCharacters } from 'marvel_rn_app/src/webservices/webservices';

import HeroesCell from './HeroesCell'

export default class HeroesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentWillMount() {

        const url = '/characters?apikey=' + '30e3aa9376e13919908b2a5bc72df28a'
    
        fetchCharacters(url)
        .then((response) => {
            const listaHeroes = response.data && response.data.results 
                                ? response.data.results 
                                : [] 
            this.setState({ list: listaHeroes })
        }).catch((error) => {
            console.log("fetchCharacters error: ", error)
        });
    }

    renderItem(item, idex) {
        return <HeroesCell 
                    item={item}
                />
    }

    render() {
        return (
            <View>
                <Text> Listado de Heroes </Text>

                <FlatList 
                    data={ this.state.list }
                    renderItem={ ({ item }) => this.renderItem(item) }
                    keyExtractor={ ( item ) => item.id }
                    extraData={ this.state }
                />
            </View>
        )
    }
}