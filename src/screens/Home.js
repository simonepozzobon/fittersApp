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

import MainTemplate from '../presentation/MainTemplate'
const logo = require('../../assets/brand/logo.png');
const Pin = require('../../assets/Pin.png');
import MarkerData from '../dummies/Marker'

import MapView from 'react-native-maps'
import {
    Marker,
    Callout,
}
from 'react-native-maps'
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
    constructor() {
        super()
        this.state = {
            screenWidth: 0,
            email: '',
            password: '',
            region: {
                latitude: 45.465317,
                longitude: 9.189441,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            bounceValue: new Animated.Value(Dimensions.get('window').height * 0.3),
            item: {
                title: null,
                description: null,
            }
        }
        // this.state.bounceValue = new Animated.Value(100)

        this.current = null

    }

    // Component State Management

    componentDidMount() {
        this.setState({
            screenWidth: Dimensions.get('window').width,
        })

        this.initialPosition = Geolocation.getCurrentPosition(position => this.positionSet(position));
        this.watchID = Geolocation.watchPosition(position => this.positionSet(position));
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

    onPressPin(tile) {
        console.log(tile);
    }

    _toggleSubView(marker) {
        let toValue = Dimensions.get('window').height * 0.3;

        if (isHidden) {
            toValue = 0;
        }

        if (this.current == null) {
            this.setState({
                item: {
                    title: marker.title,
                    description: marker.description
                }
            })
        }

        Animated.spring(
            this.state.bounceValue, {
                toValue: toValue,
                duration: 600,
                velocity: 3,
                tension: 2,
                friction: 6,
            }
        ).start();

        isHidden = !isHidden;
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

        let animationPanel = {
            transform: [{
                translateY: this.state.bounceValue
            }]
        }

        // Component
        return (
            <MainTemplate>
                <View style={{flex: 1}}>
                    <MapView
                        style={styles.map}
                        region={this.state.region}
                        onRegionChange={this.onRegionChange.bind(this)}
                    >
                        {
                            MarkerData.map(marker => (
                                <Marker
                                    key={marker.id}
                                    coordinate={marker.latlng}
                                    title={marker.title}
                                    description={marker.description}
                                >
                                    
                                    <TouchableOpacity
                                      onPress={() => {this._toggleSubView(marker)}}
                                      >
                                        <Image
                                            style={styles.pin}
                                            source={Pin}
                                        />
                                    </TouchableOpacity>
                                        
                                    <Callout
                                        alphaHitTest
                                        tooltip
                                    />
                                </Marker>
                            ))
                        }

                    </MapView>
                      <Animated.View
                          style={[
                              styles.subView,
                              animationPanel,
                          ]}
                          >
                            <View style={styles.panelTop}>
                                <View>
                                    <Text>Immagine</Text>
                                </View>
                                <View>
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                        <View style={{}}>
                                            <Text style={styles.panelLabel}>Palestra</Text>
                                            <Text style={styles.panelData}>{this.state.item.title}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                                            <Text style={styles.panelRate}>5</Text>
                                            <Text style={styles.panelRateDecimal}>,00</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={[{
                                        marginTop: 20
                                    }]}>
                                        <Text style={styles.panelLabel}>Indirizzo palestra</Text>
                                        <Text style={styles.panelData}>{this.state.item.description}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.panelConfirmContainer}>
                                <TouchableOpacity style={styles.panelConfirm}>
                                    <Text style={styles.panelConfirmTxt}>Conferma</Text>
                                </TouchableOpacity>
                            </View>
                      </Animated.View>
                </View>
            </MainTemplate>
        );
    }
}

const styles = StyleSheet.create({
    // Forms
    map: {
        width: Dimensions.get('window').width,
        height: 100,
        flex: 1,
    },
    pin: {
        width: 36,
        height: 36,
    },
    subView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#f7f7f7",
        height: Dimensions.get('window').height * 0.3,
        flex: 1,
        paddingTop: 24,
        alignItems: 'center',
    },
    panelTop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    panelRate: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FC2D1C',
    },
    panelRateDecimal: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FC2D1C',
    },
    panelLabel: {
        fontSize: 10
    },
    panelData: {
        fontSize: 18
    },
    panelConfirmContainer: {
        marginTop: 40,
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    panelConfirm: {
        backgroundColor: 'white',
        width: '80%',
        padding: 8,
        borderRadius: 12,
    },
    panelConfirmTxt: {
        textAlign: 'center',
        backgroundColor: 'white',
        color: '#ff5900',
    }
})

export default Home;
