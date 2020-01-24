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

import MainTemplate from '../presentation/MainTemplate'
import MapView from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service';

const logo = require('../../assets/brand/logo.png');

class Login extends Component {
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

        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                }, {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000
                }
            );
        }
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
                  <MapView
                      initialRegion={{
                          latitude: 37.78825,
                          longitude: -122.4324,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                      }}
                  />
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
        color: '#ff5900',
    },
    logo: {
        width: Dimensions.get('window').width / 4,
    }
})

export default Login;
