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
    SafeAreaView,
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
    createAppContainer
}
from 'react-navigation';
import {
    createStackNavigator
}
from 'react-navigation-stack';

import Login from './src/screens/Login'
import Register from './src/screens/Register'

const App: () => React$Node = () => {
    return (
        <LinearGradient
            colors={['#ff5900', '#ff2a00']}
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
            style={styles.backgroundGradient}>
                <StatusBar barStyle="dark-content" />
                <Login />
            </LinearGradient>
    );
};

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

const AppNavigator = createStackNavigator({
    login: {
        screen: Login,
    },
    register: {
        screen: Register,
    }
})

export default createAppContainer(AppNavigator);
