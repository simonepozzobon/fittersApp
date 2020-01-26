/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
}
from 'react-native/Libraries/NewAppScreen';

import {
    createAppContainer,
    createSwitchNavigator

}
from 'react-navigation';

import Login from './src/screens/Login'
import Register from './src/screens/Register'
import CompraIngresso from './src/screens/CompraIngresso'
import Selection from './src/screens/Selection'
import SaleSettings from './src/screens/sale/Settings'
import SalesCompleted from './src/screens/sale/Completed'
import 'react-native-gesture-handler'

const AppNavigator = createSwitchNavigator({
    login: Login,
    register: Register,

    userSelection: Selection,

    compraingresso: CompraIngresso,

    saleSettings: SaleSettings,
    saleCompleted: SalesCompleted,

}, {
    initialRouteName: 'saleCompleted',
});

export default createAppContainer(AppNavigator);
