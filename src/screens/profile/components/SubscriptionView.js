import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import DataGroup from "./DataGroup";

export class SubscriptionView extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View
					style={{
						paddingVertical: 16
					}}
				>
					<DataGroup
						hasMargin={false}
						label="palestra"
						value="Get Fit"
					/>
					<DataGroup
						label="indirizzo palestra"
						value="Via Genova, 3 12345 Milano"
					/>
					<DataGroup label="tipo di abbonamento" value="Gold" />
					<DataGroup label="numero abbonamento" value="DX 25489" />
					<DataGroup
						label="scadenza abbonamento"
						value="10/10/2020"
					/>
				</View>
				<View style={styles.bigBar}></View>
				<View style={styles.smBar}></View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		borderWidth: 0.5,
		borderColor: "#252525",
		borderRadius: 12,
		paddingHorizontal: 24
	},
	bigBar: {
		position: "absolute",
		borderRightColor: "#FF2A00",
		borderRightWidth: 16,
		height: "100%",
		right: 20
	},
	smBar: {
		position: "absolute",
		borderLeftColor: "#FF2A00",
		borderLeftWidth: 28,
		height: "100%",
		right: 40
	}
});
export default SubscriptionView;
