import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

export default  class HeroesCell extends Component {

    static defaultProps = {
        item:   {}
    }

    render() {

        const { item } = this.props
        const secureImageUrl = item.thumbnail.path.replace("http", "https")
        const imageSrc = secureImageUrl + '.' + item.thumbnail.extension

        return (
            <TouchableOpacity style={styles.container}>
                <Image source={{ uri: imageSrc }} style={styles.image} resizeMode={'cover'}/> 
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: 200
    },
    image: {
        width: Dimensions.get('window').width,
        height: 200
    }
})