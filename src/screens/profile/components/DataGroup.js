import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export class DataGroup extends Component {
	render() {
		let hasMargin = this.props.hasMargin == false ? null : 18;

		const styles = StyleSheet.create({
			valuesGroup: {
				marginTop: hasMargin
			},
			label: {
				fontSize: 9,
				fontWeight: "300"
			},
			value: {
				fontSize: 16
			}
		});

		return (
			<View style={styles.valuesGroup}>
				<Text style={styles.label}>{this.props.label}</Text>
				<Text style={styles.value}>{this.props.value}</Text>
			</View>
		);
	}
}

export default DataGroup;
