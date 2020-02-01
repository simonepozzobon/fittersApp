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

import Profile from "./src/screens/profile/Profile";
import Terms from "./src/screens/profile/Terms";
import Payment from "./src/screens/profile/Payment";
import Tickets from "./src/screens/profile/EntranceList";
import Subscriptions from "./src/screens/profile/Subscriptions";

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
		initialRouteName: "buyMap",
		headerMode: "none"
	}
);

const SaleStack = createStackNavigator(
	{
		saleSettings: SaleSettings,
		saleCompleted: SalesCompleted
	},
	{
		initialRouteName: "saleSettings",
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
		initialRouteName: "userSelection",
		headerMode: "none"
	}
);

const ProfileStack = createStackNavigator(
	{
		profile: Profile,
		tickets: Tickets,
		subscriptions: Subscriptions,
		terms: Terms,
		payment: Payment
	},
	{
		initialRouteName: "subscriptions",
		headerMode: "none"
	}
);

const AppNavigator = createSwitchNavigator(
	{
		login: AuthStack,

		app: AppStack,

		profile: ProfileStack
	},
	{
		initialRouteName: "profile",
		backBehavior: "history"
	}
);

export default createAppContainer(AppNavigator);
