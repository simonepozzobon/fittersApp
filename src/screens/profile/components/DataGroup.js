import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export class DataGroup extends Component {
	render() {
		return (
			<View style={styles.valuesGroup}>
				<Text style={styles.label}>{this.props.label}</Text>
				<Text style={styles.value}>{this.props.value}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	valuesGroup: {
		marginTop: 18
	},
	label: {
		fontSize: 9,
		fontWeight: "300"
	},
	value: {
		fontSize: 16
	}
});

export default DataGroup;
