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

import MainTemplate from "../presentation/MainTemplate";
import UiButton from "../components/UiButton";
import SplashScreen from "react-native-splash-screen";

const logo = require("../../assets/brand/logo.png");
const facebook = require("../../assets/facebook_social.png");
const google = require("../../assets/google_social.png");

const { width, height } = Dimensions.get("window");

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			screenWidth: 0,
			email: "",
			password: ""
		};
	}

	// Component State Management

	componentDidMount() {
		SplashScreen.hide();

		this.setState({
			screenWidth: Dimensions.get("window").width
		});
	}

	// Methods
	goTo(route) {
		this.props.navigation.navigate(route);
	}

	// Render
	render() {
		// Dynamic styles

		// Component
		return (
			<MainTemplate hasHeader={false}>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<View style={{ marginTop: 20 }}>
						<TextInput
							autoCorrect={false}
							value={this.state.email}
							placeholder="your email"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="email-address"
							onChangeText={this.emailSet}
							onSubmitEditing={this.focusToPassword}
							style={[styles.input]}
						/>
					</View>
					<View style={{ marginTop: 20 }}>
						<TextInput
							autoCorrect={false}
							value={this.state.email}
							placeholder="password"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="email-address"
							onChangeText={this.emailSet}
							onSubmitEditing={this.focusToPassword}
							style={[styles.input]}
						/>
					</View>
					<View style={{ marginTop: 20 }}>
						<UiButton
							title="Login"
							onPress={() => {
								this.goTo("userSelection");
							}}
							fullWidth="0.7"
						/>
					</View>
					<View style={{ marginTop: 40 }}>
						<Text style={{ color: "white" }}>Forgot Password?</Text>
					</View>
					<View style={{ height: 80, marginTop: 100 }}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center"
							}}
						>
							<TouchableOpacity
								style={[styles.btnSocial]}
								onPress={() => {
									this.goTo("register");
								}}
							>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center"
									}}
								>
									<Image
										source={facebook}
										resizeMode="contain"
										style={{ width: 24, height: 24 }}
									/>
									<Text
										style={[
											styles.btnFacebook,
											{ marginLeft: 8 }
										]}
									>
										Sign Up
									</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.btnSocial, { marginLeft: 20 }]}
								onPress={() => {
									this.goTo("register");
								}}
							>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center"
									}}
								>
									<Image
										source={google}
										resizeMode="contain"
										style={{ width: 24, height: 24 }}
									/>
									<Text
										style={[
											styles.btnGoogle,
											{ marginLeft: 8 }
										]}
									>
										Sign Up
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
					<View style={{ marginTop: 40, flexDirection: "row" }}>
						<Text style={{ color: "white" }}>
							Don't have an account?
						</Text>
						<TouchableOpacity
							style={{ paddingLeft: 10 }}
							onPress={() => {
								this.goTo("register");
							}}
						>
							<Text
								style={{ color: "white", fontWeight: "bold" }}
							>
								Sign Up
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</MainTemplate>
		);
	}
}

const styles = StyleSheet.create({
	// Forms
	formInput: {
		marginBottom: 20
	},
	inputLabel: {
		fontSize: 16,
		marginBottom: 5
	},
	input: {
		height: 44,
		borderRadius: 12,
		borderColor: "white",
		borderWidth: 2,
		paddingHorizontal: 10,
		color: "white",
		width: width * 0.7
	},
	btnWhite: {
		backgroundColor: "white",
		padding: 8,
		borderRadius: 12
	},
	btnWhiteText: {
		textAlign: "center",
		color: "#FF2A00"
	},
	btnSocial: {
		marginTop: 30,
		backgroundColor: "white",
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 12
	},
	btnFacebook: {
		color: "#3C5388",
		fontStyle: "italic",
		fontSize: 14,
		fontWeight: "300"
	},
	btnGoogle: {
		color: "#C45348",
		fontStyle: "italic",
		fontSize: 14,
		fontWeight: "300"
	},
	logo: {
		width: Dimensions.get("window").width / 4
	}
});

export default Login;
