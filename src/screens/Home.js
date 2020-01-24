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
import Geolocation from '@react-native-community/geolocation';
const logo = require('../../assets/brand/logo.png');
const {
    width,
    height
} = Dimensions.get('window');

class Home extends Component {
    constructor() {
        super()
        this.state = {
            screenWidth: 0,
            email: '',
            password: '',
            coords: {
                latitude: 0,
                longitude: 0,
            },
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

        let coords
        Geolocation.getCurrentPosition(info => {
            this.setState({
                coords: info.coords
            })
        });

        // Component
        return (
            <MainTemplate>
                <View style={{flex: 1}}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: this.state.coords.latitude,
                            longitude: this.state.coords.longitude,
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
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})

export default Home;
