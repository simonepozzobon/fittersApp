import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DrawerMenu from "./DrawerMenu";
import Header from "./Header";
import { withNavigation } from "react-navigation";

const { height } = Dimensions.get("window");

class MainTemplate extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// Component State Management

	componentDidMount() {
		// console.log(this.props.navigation);
	}

	// Methods
	openDrawer() {
		this.drawer.openDrawer();
	}

	goTo() {
		if (typeof this.props.onPressTimes == "function") {
			this.props.onPressTimes();
		} else if (this.props.onPressTimes) {
			if (this.props.onPressTimes == "back") {
				this.props.navigation.goBack(null);
			} else {
				this.props.navigation.navigate(this.props.onPressTimes);
			}
		} else {
			console.log("non props");
		}
		// this.props.onPressTimes
	}

	// Render
	render() {
		let view = (
			<KeyboardAwareScrollView contentContainerStyle={styles.container}>
				<ScrollView contentContainerStyle={styles.scroll}>
					<View style={styles.content}>{this.props.children}</View>
				</ScrollView>
			</KeyboardAwareScrollView>
		);

		if (this.props.fixedView == true) {
			view = <View style={styles.content}>{this.props.children}</View>;
		}

		let header;
		if (
			typeof this.props.hasHeader == "undefined" ||
			this.props.hasHeader == null
		) {
			header = (
				<Header
					onlyBurger={this.props.onlyBurger}
					onPressBurger={this.openDrawer.bind(this)}
					onPressTimes={this.goTo.bind(this)}
				/>
			);
		}

		// Component
		return (
			<LinearGradient
				colors={["#ff2a00", "#FF2A00"]}
				start={{ x: 0.0, y: 0.25 }}
				end={{ x: 0.5, y: 1.0 }}
				style={styles.backgroundGradient}
			>
				{header}
				<DrawerMenu
					ref={drawer => (this.drawer = drawer)}
					navigation={this.props.navigation}
				/>
				{view}
			</LinearGradient>
		);
	}
}

const drawer = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 30,
		zIndex: 0
	},
	animatedBox: {
		flex: 1,
		backgroundColor: "#38C8EC",
		padding: 10,
		zIndex: 2,
		height: height
	}
});

const styles = StyleSheet.create({
	backgroundGradient: {
		flex: 12,
		zIndex: 0
	},
	scroll: {
		flex: 12,
		justifyContent: "center",
		alignItems: "center"
	},
	container: {
		flex: 12,
		justifyContent: "center",
		alignItems: "center"
	},
	content: {
		flex: 12
	}
});

export default withNavigation(MainTemplate);
