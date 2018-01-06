import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default  class HeroesCell extends Component {

    render() {

        const { item } = this.props

        return (
            <View>
                <Text>{ item.name }</Text> 
            </View>
        )
    }
}