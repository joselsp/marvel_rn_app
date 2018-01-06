import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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
   
        fetchCharacters('/characters')
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
            <View style={styles.container}>
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

const styles = StyleSheet.create({

    container: {
        paddingTop: 25,
    }
})