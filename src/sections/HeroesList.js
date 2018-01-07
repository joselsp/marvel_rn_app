import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator, ListView } from 'react-native';
import axios from 'axios'
import { fetchCharacters } from 'marvel_rn_app/src/webservices/webservices';
import Spinner from 'react-native-spinkit'

import HeroesCell from './HeroesCell'
import { Actions } from 'react-native-router-flux';

// Redux
import { connect } from 'react-redux'
import * as HeroesActions from 'marvel_rn_app/src/redux/actions/heroes'


class HeroesList extends Component {

    constructor(props) {
        super(props)
        this.renderRow = this.renderRow.bind(this)
        this.onEndReached = this.onEndReached.bind(this)
    }

    componentWillMount() {   
        
        this.props.initHeroesList()        
    }

    onSelect(heroe) {
        this.props.updateSelected(heroe)
    }

    renderFooter() {

        return ( 
            <View style={styles.spinner}>
                <Spinner isVisible={this.props.isFetching} size={40} type={'ChasingDots'} color={'white'}/>
            </View>
        )
    }

    onEndReached() {

        if(this.props.list.length < this.props.total && !this.props.isFetching) {
            let newOffset = this.props.offset + 10
            this.props.fetchHeroesList(newOffset)
        }        
    }

    renderRow(rowData) {
        return <HeroesCell item={rowData} onSelect={ (heroe) => this.onSelect(heroe) } key={rowData.id} />
    }

    render() {

        const list = this.props.list
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        const datasource = ds.cloneWithRows(list)

        return (
            <View style={styles.container}>
                <ListView 
                    dataSource              = { datasource }
                    renderRow               = { this.renderRow }
                    onEndReached            = { this.onEndReached }
                    enableEmptySections     = { true }
                    refreshControl          = {
                                                <RefreshControl
                                                    refreshing  = { this.props.isFetching }
                                                    onRefresh   = { () => this.props.initHeroesList() }
                                                    colors      = { ['white'] }
                                                    tintColor   = { 'white' }
                                                />
                                            }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.heroes.list,
        total: state.heroes.total,
        offset: state.heroes.offset,
        item: state.heroes.item,
        isFetching: state.heroes.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

        initHeroesList: () => {
            dispatch(HeroesActions.initHeroesList())
        },

        fetchHeroesList: (offset) => {
            dispatch(HeroesActions.updateHeroesListOffset(offset))
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
        flex: 1,
    },

    spinner: {
        marginBottom: 50,
        alignItems: 'center',
      },
})