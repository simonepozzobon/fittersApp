import React, { Component } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export class DrawerMenuSingle extends Component {
	render() {
		return (
			<TouchableOpacity>
				<View style={styles.container}>
					<Text style={styles.link}>{this.props.title}</Text>
					<Image
						source={this.props.src}
						resizeMode="contain"
						style={styles.icon}
					/>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 24,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center"
	},
	link: {
		color: "#252525",
		textAlign: "right"
	},
	icon: {
		marginLeft: 16,
		width: 28
	}
});

export default DrawerMenuSingle;
