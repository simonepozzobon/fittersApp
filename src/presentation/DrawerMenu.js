import React, { Component } from "react";
import {
	Animated,
	Image,
	Text,
	View,
	StyleSheet,
	Dimensions,
	Easing
} from "react-native";
import DrawerMenuSingle from "./DrawerMenuSingle";
import menuIcons from "../../assets/ui";
import assets from "../../assets";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export class DrawerMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			drawerPosition: new Animated.Value(width),
			isOpen: false,
			panelWidth: 0
		};
	}

	// componentDidMount() {
	// 	setTimeout(this.openDrawer.bind(this), 500);
	// }

	closeMenu() {
		if (this.state.isOpen == true) {
			let toValue =
				this.state.panelWidth < 1 ? width : this.state.panelWidth;

			Animated.timing(this.state.drawerPosition, {
				toValue: toValue,
				duration: 300,
				easing: Easing.inOut(Easing.ease)
			}).start(() => {
				this.setState({ isOpen: false });
			});
		}
	}

	openDrawer() {
		if (this.state.isOpen == false) {
			Animated.timing(this.state.drawerPosition, {
				toValue: 0,
				duration: 200,
				easing: Easing.inOut(Easing.ease)
			}).start(() => {
				this.setState({ isOpen: true });
			});
		}
	}

	render() {
		let animationPanel = {
			transform: [
				{
					translateX: this.state.drawerPosition
				}
			]
		};

		return (
			<Animated.View style={[styles.wrapper, animationPanel]}>
				<View
					style={styles.container}
					onLayout={event => {
						let panelWidth = event.nativeEvent.layout.width;
						// console.log(panelWidth);

						this.setState({ panelWidth: panelWidth });
					}}
				>
					<View style={styles.burgerContainer}>
						<TouchableOpacity onPress={this.closeMenu.bind(this)}>
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
							destination="profile"
						/>

						<DrawerMenuSingle
							title="I tuoi abbonamenti"
							src={menuIcons.abbonamenti}
							destination="subscriptions"
						/>
						<DrawerMenuSingle
							title="I tuoi ingressi"
							src={menuIcons.ingressi}
							destination="tickets"
						/>
						<DrawerMenuSingle
							title="Regolamento"
							src={menuIcons.regolamento}
							destination="terms"
						/>
						<DrawerMenuSingle
							title="Pagamento"
							src={menuIcons.pagamento}
							destination="payment"
						/>
						<DrawerMenuSingle
							title="Invita i tuoi amici"
							src={menuIcons.invite}
							destination="userSelection"
						/>
					</View>
					<View style={styles.logout}>
						<DrawerMenuSingle
							title="Logout"
							src={menuIcons.invite}
							destination="login"
						/>
					</View>
				</View>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		height: height,
		position: "absolute",
		justifyContent: "space-between",
		alignItems: "flex-end",
		zIndex: 10,
		right: 0,
		transform: [
			{
				translateX: -width
			}
		]
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
		marginTop: 54
	},
	burger: {
		width: 24,
		height: 24
	},
	name: {
		marginTop: 64
	},
	logout: {
		flexGrow: 1,
		marginBottom: 85,
		justifyContent: "flex-end"
	},
	nameTxt: {
		fontSize: 16,
		fontWeight: "800",
		color: "#FF2A00"
	}
});

export default DrawerMenu;
