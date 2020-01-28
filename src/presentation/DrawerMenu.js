import React, { Component } from "react";
import {
	Animated,
	Image,
	Text,
	View,
	StyleSheet,
	Dimensions
} from "react-native";
import DrawerMenuSingle from "./DrawerMenuSingle";
import menuIcons from "../../assets/ui";
import assets from "../../assets";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("window");

export class DrawerMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			xPosition: new Animated.Value(width),
			isOpen: false
		};
	}

	closeMenu() {
		if (this.state.isOpen == true) {
		}
	}

	render() {
		const test = StyleSheet.create({
			animation: {
				transform: [
					{
						translateX: width
					}
				]
			}
		});

		return (
			<View style={[styles.wrapper]}>
				<View style={styles.container}>
					<View style={styles.burgerContainer}>
						<TouchableOpacity
							onPress={() => {
								this.closeMenu();
							}}
						>
							<Image
								source={assets.burger_orange}
								resizeMode="contain"
								style={styles.burger}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.name}>
						<Text style={styles.nameTxt}>Paolo Vendramini</Text>
					</View>
					<View style={styles.content}>
						<DrawerMenuSingle
							title="Profilo"
							src={menuIcons.profile}
						/>

						<DrawerMenuSingle
							title="I tuoi abbonamenti"
							src={menuIcons.abbonamenti}
						/>
						<DrawerMenuSingle
							title="I tuoi ingressi"
							src={menuIcons.ingressi}
						/>
						<DrawerMenuSingle
							title="Regolamento"
							src={menuIcons.regolamento}
						/>
						<DrawerMenuSingle
							title="Pagamento"
							src={menuIcons.pagamento}
						/>
						<DrawerMenuSingle
							title="Invita i tuoi amici"
							src={menuIcons.invite}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		height: height,
		width: width,
		position: "absolute",
		justifyContent: "space-between",
		alignItems: "flex-end",
		zIndex: 10
	},
	container: {
		height: height,
		justifyContent: "flex-start",
		alignItems: "flex-end",
		backgroundColor: "white",
		paddingRight: 28,
		paddingLeft: 48
	},
	content: {
		flexDirection: "column",
		justifyContent: "center",
		marginTop: 18
	},
	burgerContainer: {
		marginTop: 78
	},
	burger: {
		width: 24,
		height: 24
	},
	name: {
		marginTop: 64
	},
	nameTxt: {
		fontSize: 16,
		fontWeight: "800",
		color: "#FF2A00"
	}
});

export default DrawerMenu;
