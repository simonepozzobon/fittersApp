import React, { Component } from "react";
import { Text, View } from "react-native";
import MainTemplate from "../presentation/MainTemplate";

export class Terms extends Component {
	goTo(route) {
		this.props.navigation.navigate(route);
	}

	render() {
		return (
			<MainTemplate
				onPressTimes={() => {
					this.goTo("userSelection");
				}}
			>
				<Text> textInComponent </Text>
			</MainTemplate>
		);
	}
}

export default Terms;
