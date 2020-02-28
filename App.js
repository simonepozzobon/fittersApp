/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import "react-native-gesture-handler";

import React, { Component } from "react";
import AppContainer from "./src/navigation/Routes";
import SplashScreen from "react-native-splash-screen";
import axios from 'axios'

export class App extends Component {
	componentDidMount() {
		// console.log("nav0", this.nav);
		SplashScreen.hide();
	}

	handleNavigationChange(prevState, newState, action) {
		// console.log(prevState, newState, action);
	}

	render() {
		return (
			<AppContainer
				ref={nav => (this.nav = nav)}
				onNavigationStateChange={this.handleNavigationChange.bind(this)}
			/>
		);
	}
}

export default App;
