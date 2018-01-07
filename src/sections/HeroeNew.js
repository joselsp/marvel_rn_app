import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Input, Button } from 'marvel_rn_app/src/widgets'
import ImagePicker from 'react-native-image-picker'

//Redux
import { connect } from 'react-redux'
import * as HeroesActions from 'marvel_rn_app/src/redux/actions/heroes'

class HeroeNew extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            nameError: '',

            description: '',
            descriptionError: '',

            thumbnail: null
        }        
    }

    validateForm() {
        let valid = true
        let errors = {}

        if(!this.state.name) {
            errors.name = 'Elige un nombre válido'
            valid = false
        }

        if(!this.state.description) {
            errors.description = 'Elige una descripción válida'
            valid = false
        }

        this.setState({ 
            nameError: errors.name ? errors.name : '',
            descriptionError: errors.description ? errors.description : '',
        })

        return valid
    }

    onSubmit() {

        if( this.validateForm() ) {
            
            const characterData = {
                id: 9999999,
                name: this.state.name,
                description: this.state.description,
                thumbnail: this.state.thumbnail ? 'data:image/jpeg;base64,' + this.state.thumbnail.data : null
            }

            this.props.postHeroe(characterData)  
        } 
    }

    onSelectImageTapped() {
        const options = {
            title: 'Seleccionar imagen',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {

                this.setState({
                    thumbnail: response
                });
            }
        });
    }

    render() {        
        const imageUri = this.state.thumbnail ? { uri: this.state.thumbnail.uri } : null
        const imageButtonText = this.state.thumbnail ? this.state.thumbnail.fileName : 'Elegir imagen'
        
        return (
            <View style={styles.container}>

                <View style={styles.imageContainer}>

                    <Image source={imageUri} style={styles.imageContainerBackground} resizeMode={'cover'} />
                    
                    <TouchableOpacity style={styles.button} onPress={ () => this.onSelectImageTapped() } >
                        <Text style={styles.textButton}>{ imageButtonText }</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.inputContainer}>
                    <Input
                        onChangeText={(v) => this.setState({ name: v })}
                        value={this.state.name}
                        error={this.state.nameError}
                        label={'Nombre:'}
                        placeholder={'Captain America'}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        onChangeText={(v) => this.setState({ description: v })}
                        value={this.state.description}
                        error={this.state.descriptionError}
                        label={'Descripción:'}
                        placeholder={'Captain America was designed as a patriotic supersoldier'}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        label={'Guardar'}
                        onPress={() => this.onSubmit()}
                        isFetching={this.props.isFetching}
                    />
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.heroes.isFetching,
        heroe: state.heroes.item,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        postHeroe: (data) => {
            dispatch(HeroesActions.postHeroe(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroeNew)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgb(42,42,42)',
    },

    imageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainerBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    button: {
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 6,
    },

    textButton: {
        color: 'white',
        fontWeight: '600',
    },

    inputContainer: {
        margin: 20,
    },

    buttonContainer: {
        margin: 20,
    },

})