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
import EntranceHome from "./src/screens/entrance/EntranceList";

import "react-native-gesture-handler";
import { createStackNavigator } from "react-navigation-stack";

const AuthStack = createStackNavigator(
	{
		login: Login,
		register: Register
	},
	{
		headerMode: "none"
	}
);

const BuyStack = createStackNavigator(
	{
		buyMap: BuyMap,
		buyCheckout: BuyCheckout,
		buyCompleted: BuyCompleted
	},
	{
		headerMode: "none"
	}
);

const SaleStack = createStackNavigator(
	{
		saleSettings: SaleSettings,
		saleCompleted: SalesCompleted
	},
	{
		headerMode: "none"
	}
);

const AppStack = createStackNavigator(
	{
		userSelection: Selection,
		buy: BuyStack,
		sale: SaleStack
	},
	{
		headerMode: "none"
	}
);

const ProfileStack = createStackNavigator(
	{
		terms: Terms,
		payment: Payment
	},
	{
		headerMode: "none"
	}
);

const AppNavigator = createSwitchNavigator(
	{
		login: AuthStack,

		app: AppStack,

		profile: ProfileStack,

		entranceHome: EntranceHome
	},
	{
		initialRouteName: "profile",
		backBehavior: "history"
	}
);

export default createAppContainer(AppNavigator);
