import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Selection from "../screens/Selection";

import BuyMap from "../screens/buy/Map";
import BuyCheckout from "../screens/buy/Checkout";
import BuyCompleted from "../screens/buy/Completed";

import SaleSettings from "../screens/sale/Settings";
import SalesCompleted from "../screens/sale/Completed";

import Profile from "../screens/profile/Profile";
import Terms from "../screens/profile/Terms";
import Payment from "../screens/profile/Payment";
import Tickets from "../screens/profile/Tickets";
import Subscriptions from "../screens/profile/Subscriptions";

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

const ProfileStack = createStackNavigator(
	{
		profile: Profile,
		tickets: Tickets,
		subscriptions: Subscriptions,
		terms: Terms,
		payment: Payment
	},
	{
		headerMode: "none",
		initialRouteName: "subscriptions"
	}
);

const AppStack = createStackNavigator(
	{
		userSelection: Selection,
		buy: BuyStack,
		sale: SaleStack,
		profile: ProfileStack
	},
	{
		initialRouteName: "profile",
		headerMode: "none"
	}
);

const AuthStack = createStackNavigator(
	{
		login: Login,
		register: Register
	},
	{
		headerMode: "none",
		initialRouteName: "login"
	}
);

const AppNavigator = createSwitchNavigator(
	{
		auth: AuthStack,
		app: AppStack
	},
	{
		initialRouteName: "app"
	}
);

export default createAppContainer(AppNavigator);
