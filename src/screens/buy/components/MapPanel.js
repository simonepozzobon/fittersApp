import React, {
    Component
}
from 'react'
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
}
from 'react-native'

import GestureRecognizer, {
    swipeDirections
}
from 'react-native-swipe-gestures'

import UiButton from '../../../components/UiButton'

const rating = require('../../../../assets/rating.png')
const {
    width,
    height
} = Dimensions.get('window')

class MapPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bounceValue: new Animated.Value(height * 0.3),
            isOpen: true,
            item: null,
                description: null,
                logo: null,
        }
    }
    }

    // Component State Management
    componentDidMount() {

    }

    // Methods
    _selectMarker(marker) {
        if (this.state.isOpen == false && this.props.item == null) {
            console.log('primo caso');
            this.setState({
                item: marker
            })
            this._toggleSubView()
            toValue = 0;
        }
        else {
            if (this.props.item && this.props.item.id == marker.id) {
                console.log('sono uguali');
                this._toggleSubView().then(() => {
                    this.setState({
                        item: null
                    })
                })
            }
            else if (this.props.item && this.props.item.id != marker.id) {
                console.log('sono diversi');
                this._toggleSubView().then(() => {
                    this.setState({
                        item: marker
                    })

                    this._toggleSubView()
                })
                item: {
                    title: marker.title,
                    description: marker.description,
                    logo: marker.logo,
            }
            else {
                this.setState({
                    item: marker
                })
                this._toggleSubView()
            }
        }
    }

    _toggleSubView() {
        return new Promise((resolve, reject) => {

            let toValue = this.state.isOpen == false ? height * 0.3 : 0

            console.log('parte');
            Animated.spring(
                this.state.bounceValue, {
                    toValue: toValue,
                    duration: 600,
                    velocity: 3,
                    tension: 2,
                    friction: 6,
                }
            ).start(() => {
                this.setState({
                    isOpen: !this.state.isOpen
                })
                resolve()
            });
        });




        // setTimeout(() => {
        //     if (marker) {
        //         this.setState({
        //             item: {
        //                 title: marker.title,
        //                 description: marker.description,
        //                 logo: marker.logo,
        //             }
        //         })
        //         isHidden = !isHidden;
        //     }
        //     else {
        //         this.setState({
        //             item: null
        //         })
        //         isHidden = !isHidden;
        //     }
        // }, 800)

    }

    onSwipeDown() {
        console.log('down');
        // this._toggleSubView(this.props.item)
    }

    // Render
    render() {
        // Dynamic styles
        const compStyles = StyleSheet.create({})

        let animationPanel = {
            transform: [{
                translateY: this.state.bounceValue
            }]
        }

        // Component
        return (
            <Animated.View
                style={[
                    styles.subView,
                    // animationPanel,
                ]}
                >
                  <View style={styles.panelTop}>
                      <View style={styles.panelLeft}>
                          <Image
                            source={this.props.item ? this.props.item.logo : null}
                            resizeMode="contain"
                            style={styles.panelImage}
                          />
                      </View>
                      <View style={styles.panelRight}>
                          <View style={styles.panelNamePrice}>
                              <View>
                                  <Text style={styles.panelLabel}>
                                    Palestra
                                  </Text>
                                  <Text style={styles.panelData}>
                                    {this.props.item ? this.props.item.title : null}
                                  </Text>
                              </View>
                              <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                                  <Text style={styles.panelPrice}>
                                    5
                                  </Text>
                                  <Text style={styles.panelPriceDecimal}>
                                    ,00
                                  </Text>
                              </View>

                          </View>
                          <View style={[{
                              marginTop: 20
                          }]}>
                              <Text style={styles.panelLabel}>
                                Indirizzo palestra
                              </Text>
                              <Text style={styles.panelData}>
                                {this.props.item ? this.props.item.address : null}
                              </Text>
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
        );
    }
}

const styles = StyleSheet.create({
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

export default MapPanel;
