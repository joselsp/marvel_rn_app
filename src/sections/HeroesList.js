import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios'
import { fetchCharacters } from 'marvel_rn_app/src/webservices/webservices';

import HeroesCell from './HeroesCell'

// Redux
import { connect } from 'react-redux'
import * as HeroesActions from 'marvel_rn_app/src/redux/actions/heroes'

class HeroesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentWillMount() {   
        
        this.props.fetchHeroesList()        
    }

    onSelect(heroe) {
        this.props.updateSelected(heroe)
    }

    renderItem(item, idex) {

        return <HeroesCell 
                    item={item}
                    onSelect={ (v) => this.onSelect(v) }
                />
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                    data={ this.props.list }
                    renderItem={ ({ item }) => this.renderItem(item) }
                    keyExtractor={ ( item ) => item.id }
                    extraData={ this.props }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state.heroes.list)
    return {
        list: state.heroes.list,
        item: state.heroes.item
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchHeroesList: () => {
            dispatch(HeroesActions.fetchHeroesList())
        },

        updateSelected: (heroe) => {
            dispatch(HeroesActions.updateHeroeSelected(heroe))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (HeroesList) 

const styles = StyleSheet.create({

    container: {
        paddingTop: 25,
    }
})