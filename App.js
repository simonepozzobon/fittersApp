/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
}
from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
}
from 'react-native/Libraries/NewAppScreen';

import LinearGradient from 'react-native-linear-gradient'

import {
    createAppContainer,
    createSwitchNavigator

}
from 'react-navigation';

import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Home from './src/screens/Home'
import 'react-native-gesture-handler'

const styles = StyleSheet.create({
    backgroundGradient: {
        flex: 1,
        resizeMode: 'cover',
    },
    topBar: {
        height: 20,
    },
    container: {
        flex: 1,
        margin: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        alignSelf: 'center',
        width: Dimensions.get('window').width / 3,
    }
});

const logo = require('./assets/brand/logo.png');

const AppNavigator = createSwitchNavigator({
    login: Login,
    register: Register,
    home: Home,
}, {
    initialRouteName: 'home',
});

export default createAppContainer(AppNavigator);
