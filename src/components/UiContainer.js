import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

class UiContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		// Component
		return <View style={styles.container}>{this.props.children}</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EDEDF0",
		width: width,
		height: height,
		padding: 32,
		alignItems: "center"
	}
});

export default UiContainer;
