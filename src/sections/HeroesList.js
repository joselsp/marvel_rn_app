import React, { Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios'
import { fetchCharacters } from '../webservices/webservices';

export default class HeroesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentWillMount() {

        fetchCharacters()
    }

    render() {
        return (
            <View>
                <Text> Listado de Heroes </Text>
            </View>
        )
    }
}