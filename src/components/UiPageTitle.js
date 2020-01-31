import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

class UiPageTitle extends Component {
	constructor() {
		super();
		this.state = {};
	}

	// Render
	render() {
		// Component
		return <Text style={styles.pageTitle}>{this.props.title}</Text>;
	}
}

const styles = StyleSheet.create({
	pageTitle: {
		fontSize: 16,
		fontWeight: "700",
		color: "#FC2D1C"
	}
});

export default UiPageTitle;
