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
import UiButton from '../../components/UiButton'
const logo = require('../../../assets/brand/logo.png');
const Pin = require('../../../assets/Pin.png');
const rating = require('../../../assets/rating.png');
import MarkerData from '../../dummies/Marker'

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
                logo: null,
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

        setTimeout(() => {
            this._toggleSubView(MarkerData[0])
        }, 1000)
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
                    description: marker.description,
                    logo: marker.logo,
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
                <Header
                    onPressTimes={() => {this.goTo('userSelection')}}
                />
                <View style={{flex: 1}}>
                    <MapTopBar/>
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
                                <View style={styles.panelLeft}>
                                    <Image
                                      source={this.state.item.logo}
                                      resizeMode="contain"
                                      style={styles.panelImage}
                                    />
                                </View>
                                <View style={styles.panelRight}>
                                    <View style={styles.panelNamePrice}>
                                        <View>
                                            <Text style={styles.panelLabel}>Palestra</Text>
                                            <Text style={styles.panelData}>{this.state.item.title}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                                            <Text style={styles.panelPrice}>5</Text>
                                            <Text style={styles.panelPriceDecimal}>,00</Text>
                                        </View>

                                    </View>
                                    <View style={[{
                                        marginTop: 20
                                    }]}>
                                        <Text style={styles.panelLabel}>Indirizzo palestra</Text>
                                        <Text style={styles.panelData}>{this.state.item.description}</Text>
                                    </View>
                                    <View style={styles.panelInfo}>
                                      <Image
                                        source={rating}
                                        resizeMode="contain"
                                        style={styles.panelRating}
                                      />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.panelConfirmContainer}>
                                <UiButton
                                    title="Conferma"
                                    fullWidth="0.8"
                                    onPress={() => {this.goTo('buyCheckout')}}
                                />
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
        zIndex: 2,
        position: 'absolute',
        width: width,
        backgroundColor: "#f7f7f7",
        flexDirection: 'column',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 36,
        paddingTop: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,

        // height: Dimensions.get('window').height * 0.3,
        // flex: 1,
        // paddingTop: 24,
        // alignItems: 'center',
    },
    panelLeft: {
        width: width * 0.3,
    },
    panelRight: {
        flexGrow: 1,
        marginLeft: 24,
    },
    panelImage: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 12,
    },
    panelTop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    panelNamePrice: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexGrow: 1
    },
    panelInfo: {
        marginTop: 12
    },
    panelPrice: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FC2D1C',
    },
    panelPriceDecimal: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FC2D1C',
    },
    panelLabel: {
        fontSize: 9,
        fontWeight: '300',
    },
    panelData: {
        fontSize: 14
    },
    panelRating: {
        height: 18,
        width: 95
    },
    panelConfirmContainer: {
        marginBottom: 60,
    },
})

export default Home;
