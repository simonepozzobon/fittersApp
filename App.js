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
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./src/redux/RootReducer";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(RootReducer);

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
			<Provider store={store}>
				<AppContainer
					ref={nav => (this.nav = nav)}
					onNavigationStateChange={this.handleNavigationChange.bind(
						this
					)}
				/>
			</Provider>
		);
	}
}

export default App;
