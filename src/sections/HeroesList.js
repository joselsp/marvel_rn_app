import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios'
import { fetchCharacters } from 'marvel_rn_app/src/webservices/webservices';

import HeroesCell from './HeroesCell'
import { Actions } from 'react-native-router-flux';

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

    renderFooter() {

        const Spinner = require('react-native-spinkit');

        return ( 
            <View style={styles.spinner}>
                <Spinner isVisible={this.props.isFetching} size={40} type={'ChasingDots'} color={'white'}/>
            </View>
        )
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
                    ListFooterComponent= { () => this.renderFooter() }
                    renderItem={ ({ item }) => this.renderItem(item) }
                    keyExtractor={ ( item ) => item.id }
                    extraData={ this.props }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.heroes.list,
        item: state.heroes.item,
        isFetching: state.heroes.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchHeroesList: () => {
            dispatch(HeroesActions.fetchHeroesList())
        },

        updateSelected: (heroe) => {
            dispatch(HeroesActions.updateHeroeSelected(heroe))
            Actions.HeroeDetail( {title: heroe.name } )
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (HeroesList) 

const styles = StyleSheet.create({

    container: {
        paddingTop: 25,
    },

    spinner: {
        marginBottom: 50,
        alignItems: 'center',
      },
})