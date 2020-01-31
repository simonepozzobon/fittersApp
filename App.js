/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Selection from "./src/screens/Selection";

import BuyMap from "./src/screens/buy/Map";
import BuyCheckout from "./src/screens/buy/Checkout";
import BuyCompleted from "./src/screens/buy/Completed";

import SaleSettings from "./src/screens/sale/Settings";
import SalesCompleted from "./src/screens/sale/Completed";
import Terms from "./src/screens/Terms";
import Payment from "./src/screens/Payment";
import "react-native-gesture-handler";

const AppNavigator = createSwitchNavigator(
	{
		login: Login,
		register: Register,

		userSelection: Selection,

		buyMap: BuyMap,
		buyCheckout: BuyCheckout,
		buyCompleted: BuyCompleted,

		saleSettings: SaleSettings,
		saleCompleted: SalesCompleted,

		terms: Terms,
		payment: Payment
	},
	{
		initialRouteName: "payment"
	}
);

export default createAppContainer(AppNavigator);
