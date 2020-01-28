import React, {
    Component
}
from 'react'

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Image,
}
from 'react-native'

import UiButton from '../components/UiButton'
import MainTemplate from '../presentation/MainTemplate'

const logo = require('../../assets/brand/logo.png');

class Selection extends Component {
    constructor() {
        super()
        this.state = {
            screenWidth: 0,
            email: '',
            password: '',
        }
    }

    // Component State Management

    componentDidMount() {
        this.setState({
            screenWidth: Dimensions.get('window').width
        })
    }

    // Methods
    goTo(route) {
        this.props.navigation.navigate(route)
    }

    // Render
    render() {
        // Dynamic styles
        const lg = Math.floor(this.state.screenWidth / 1.5)
        const compStyles = StyleSheet.create({
            formInput: {
                width: lg,
            },
            btnWhite: {
                width: lg,
            }
        })


        // Component
        return (
            <MainTemplate>
                <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
                    <View>
                      <Text style={{ color: 'white', fontStyle: 'italic', fontWeight: '300' }}>
                        Cosa vuoi fare?
                      </Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <UiButton
                            title="Cedi Ingresso"
                            fullWidth="0.7"
                            onPress={() => {this.goTo('saleSettings')}}
                        />
                        <UiButton
                            title="Compra Ingresso"
                            fullWidth="0.7"
                            onPress={() => {this.goTo('buyMap')}}
                          />
                    </View>
                  </View>
            </MainTemplate>
        );
    }
}

const styles = StyleSheet.create({
    // Forms
    formInput: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 44,
        borderRadius: 12,
        borderColor: 'white',
        borderWidth: 2,
        paddingHorizontal: 10,
        width: '70%',
        color: 'white'
    },
    btnWhite: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 12,
    },
    btnWhiteText: {
        textAlign: 'center',
        color: '#FF2A00',
    },
    logo: {
        width: Dimensions.get('window').width / 4,
    }
})

export default Selection;
