import React, { Component } from "react";

import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TextInput,
	TouchableOpacity,
	Image
} from "react-native";

import UiButton from "../components/UiButton";
import MainTemplate from "../presentation/MainTemplate";

const logo = require("../../assets/brand/logo.png");
const { width } = Dimensions.get("window");

class Selection extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: ""
		};
	}
	// Methods
	goTo(route) {
		this.props.navigation.navigate(route);
	}

	// Render
	render() {
		// Component
		return (
			<MainTemplate onlyBurger={true} fixedView={true}>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						marginBottom: 85
					}}
				>
					<View>
						<Text
							style={{
								color: "white",
								fontStyle: "italic",
								fontWeight: "300"
							}}
						>
							Cosa vuoi fare?
						</Text>
					</View>
					<View style={{ marginTop: 20 }}>
						<UiButton
							title="Cedi Ingresso"
							fullWidth="0.8"
							onPress={() => {
								this.goTo("saleSettings");
							}}
						/>
						<UiButton
							title="Compra Ingresso"
							fullWidth="0.8"
							onPress={() => {
								this.goTo("buyMap");
							}}
						/>
					</View>
				</View>
			</MainTemplate>
		);
	}
}

const styles = StyleSheet.create({});

export default Selection;
