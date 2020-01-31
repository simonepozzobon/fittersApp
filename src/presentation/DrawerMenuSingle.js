import React, { Component } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";

export class DrawerMenuSingle extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { navigate } = this.props.navigation;
		const { destination } = this.props;

		return (
			<TouchableOpacity onPress={() => navigate(destination)}>
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

export default withNavigation(DrawerMenuSingle);
