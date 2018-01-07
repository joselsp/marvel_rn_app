import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, ListView } from 'react-native';

//Redux
import { connect } from  'react-redux'

class HeroeDetail extends Component {

    render(){
        const { heroe } = this.props
        const nombre = heroe ? heroe.name : ''
        const description = heroe && heroe.description != "" ? heroe.description : 'Description not available'
        const secureImageUrl = heroe.thumbnail.path.replace("http", "https")
        const imageSrc = secureImageUrl + '.' + heroe.thumbnail.extension

        return (
            <View style={ styles.container }>
                <Image source={{ uri: imageSrc }} style={styles.image} resizeMode={'cover'} /> 
                <TextInput style={ styles.description }
                    multiline={true}
                    numberOfLines={5}
                    value={ description }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        heroe: state.heroes.item
    }
}

export default connect(mapStateToProps, null)(HeroeDetail)

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    image: {
        width: '100%',
        height: 350,
    },

    description: {
        padding: 5
    }
})