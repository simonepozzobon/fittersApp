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
    Animated,
}
from 'react-native'

import MainTemplate from '../../presentation/MainTemplate'
import Header from '../../presentation/Header'
import MapTopBar from '../../components/MapTopBar'
import MapMarker from './components/MapMarker'

const logo = require('../../../assets/brand/logo.png');

import MarkerData from '../../dummies/Marker'
import MapView from 'react-native-maps'

import Geolocation from '@react-native-community/geolocation';

const {
    width,
    height
} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let isHidden = true;

class Home extends Component {
    constructor(props) {
        super(props)
        Geolocation.getCurrentPosition(
            position => this.positionSet(position),
            err => {
                console.error('errore Geolocation', 'https://github.com/react-native-community/react-native-geolocation#getcurrentposition')
            }
        )
        // this.watchID = Geolocation.watchPosition(
        //     position => this.positionSet(position),
        //     err => {}
        // )

        this.state = {
            region: {
                latitude: 45.465317,
                longitude: 9.189441,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            cacheRegion: {},
            item: null
        }
        this.current = null
    }

    init() {

    }

    // Component State Management
    componentDidMount() {
        // setTimeout(() => {
        //     this._toggleSubView(MarkerData[0])
        // }, 1000)
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID)
    }

    // Methods
    positionSet(position) {
        let lat = position.coords.latitude
        let lng = position.coords.longitude

        let region = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

        this.setState({
            region: region
        });
    }

    goTo(route) {
        this.props.navigation.navigate(route)
    }

    onRegionChange(region) {
        this.setState({
            region: region
        });
    }

    // Render
    render() {
        // Dynamic styles

        // Component
        return (
            <MainTemplate fixedView={true}>
                <Header
                    onPressTimes={() => {this.goTo('userSelection')}}
                />
                <View style={{flex: 1}}>
                    <MapTopBar/>
                    <MapView
                        ref={mapView => this.mapView = mapView}
                        style={styles.map}
                        initialRegion={this.state.region}
                        onRegionChange={region => {this.onRegionChange(region)}}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        showsScale={true}
                    >
                        {
                            MarkerData.map(marker => (
                                <MapMarker
                                  key={marker.id}
                                  marker={marker}
                                  mapView={this.mapView}
                                />
                            ))
                        }

                    </MapView>


                </View>
            </MainTemplate>
        );
    }
}

const styles = StyleSheet.create({
    // Forms
    map: {
        width: width,
        height: height,
        flex: 1,
    },

})

export default Home;
