/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import "react-native-gesture-handler";

import React, { Component } from "react";
import { Text, View } from "react-native";
import MainTemplate from "./src/presentation/MainTemplate";
import AppContainer from "./src/navigation/Routes";
import Header from "./src/presentation/Header";
import SplashScreen from "react-native-splash-screen";

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
