import React, {
    Component
}
from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
}
from 'react-native'

import {
    hasNotch
}
from 'react-native-device-info';
const times = require('../../assets/times.png');
const logoSimple = require('../../assets/brand/logo_simple.png');


class Header extends Component {
    constructor() {
        super()
        this.state = {}
    }

    // Component State Management
    componentDidMount() {}

    // Methods

    // Render
    render() {
        // Dynamic styles
        const compStyles = StyleSheet.create({})
        const notch = hasNotch()

        const topBar = StyleSheet.create({
            topBarHeight: {
                height: notch ? 130 : 75
            }
        })

        // Component
        return (
            <View style={[styles.header, topBar.topBarHeight]}>
                <Image
                    style={{
                        width: 120,
                        height: 20,
                    }}
                    resizeMode="contain"
                    source={logoSimple}
                />
                <TouchableOpacity>
                    <Image style={{width: 18, height: 18}} source={times}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignSelf: 'stretch',
        paddingHorizontal: 28,
        paddingBottom: 16
    }
})

export default Header;
