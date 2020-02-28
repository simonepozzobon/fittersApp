import React from "react";
import { Component } from "react";

import {
	StyleSheet,
	Dimensions,
	View,
	Image,
	TouchableOpacity
} from "react-native";

import { hasNotch } from "react-native-device-info";
// @ts-ignore
const times = require("../../assets/times.png");
// @ts-ignore
const burger = require("../../assets/burger_menu.png");

const { width } = Dimensions.get("window");

class Header extends Component {
	/**
	 * @param {any} props
	 */

	constructor(props) {
		super(props);
		this.state = {};
	}

	// Component State Management
	componentDidMount() {}

	// Methods

	// Render
	render() {
		// Dynamic styles
		const notch = hasNotch();

		const topBar = StyleSheet.create({
			topBarHeight: {
				height: notch ? 96 : 76
			}
		});

		let content = (
			<TouchableOpacity onPress={this.props.onPressTimes}>
				<Image
					source={times}
					resizeMode="contain"
					style={styles.times}
				/>
			</TouchableOpacity>
		);

		if (
			typeof this.props.onlyBurger != "undefined" ||
			this.props.onlyBurger != null ||
			this.props.onlyBurger == true
		) {
			content = null;
		}

		// Component
		return (
			<View style={[styles.header, topBar.topBarHeight]}>
				<TouchableOpacity onPress={this.props.onPressBurger}>
					<Image
						source={burger}
						resizeMode="contain"
						style={styles.burger}
					/>
				</TouchableOpacity>
				{content}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		width: width,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		alignSelf: "stretch",
		paddingHorizontal: 28,
		paddingBottom: 18
	},
	burger: {
		width: 24,
		height: 24
	},
	times: {
		width: 20,
		height: 20
	}
});

export default Header;
