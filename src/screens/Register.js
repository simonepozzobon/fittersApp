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

// @ts-ignore
import CheckBox from "@react-native-community/checkbox";
import MainTemplate from "../presentation/MainTemplate";

// @ts-ignore
const facebook = require("../../assets/facebook_social.png");
// @ts-ignore
const google = require("../../assets/google_social.png");

class Register extends Component {
	/**
	 * @param {any} props
	 */
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
		this.setState({
			screenWidth: Dimensions.get("window").width
		});
	}

	// Methods
	/**
	 * @param {string} route
	 */
	goTo(route) {
		this.props.navigation.navigate(route);
	}

	// Render
	render() {
		// Dynamic styles
		const lg = Math.floor(this.state.screenWidth / 1.5);
		const compStyles = StyleSheet.create({
			formInput: {
				width: lg
			},
			btnWhite: {
				width: lg
			}
		});

		// Component
		return (
			<MainTemplate hasHeader={false}>
				<View
					style={{
						height: 80,
						marginTop: 100
					}}
				>
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
									style={{
										width: 24,
										height: 24
									}}
								/>
								<Text
									style={[
										styles.btnFacebook,
										{
											marginLeft: 8
										}
									]}
								>
									Sign Up
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.btnSocial,
								{
									marginLeft: 20
								}
							]}
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
									style={{
										width: 24,
										height: 24
									}}
								/>
								<Text
									style={[
										styles.btnGoogle,
										{
											marginLeft: 8
										}
									]}
								>
									Sign Up
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View
					style={{
						flex: 1,
						marginTop: 32
					}}
				>
					<View>
						<TextInput
							autoCorrect={false}
							value={this.state.email}
							placeholder="Name"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="email-address"
							onChangeText={this.emailSet}
							onSubmitEditing={this.focusToPassword}
							style={[compStyles.formInput, styles.input]}
						/>
					</View>
					<View
						style={{
							marginTop: 12
						}}
					>
						<TextInput
							autoCorrect={false}
							value={this.state.email}
							placeholder="Surname"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="email-address"
							onChangeText={this.emailSet}
							onSubmitEditing={this.focusToPassword}
							style={[compStyles.formInput, styles.input]}
						/>
					</View>
					<View
						style={{
							marginTop: 12
						}}
					>
						<TextInput
							autoCorrect={false}
							value={this.state.email}
							placeholder="Age"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="email-address"
							onChangeText={this.emailSet}
							onSubmitEditing={this.focusToPassword}
							style={[compStyles.formInput, styles.input]}
						/>
					</View>
					<View
						style={{
							marginTop: 12
						}}
					>
						<TextInput
							autoCorrect={false}
							value={this.state.email}
							placeholder="Indirizzo"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="email-address"
							onChangeText={this.emailSet}
							onSubmitEditing={this.focusToPassword}
							style={[compStyles.formInput, styles.input]}
						/>
					</View>
					<View
						style={{
							marginTop: 12
						}}
					>
						<TextInput
							autoCorrect={false}
							value={this.state.email}
							placeholder="Città"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="email-address"
							onChangeText={this.emailSet}
							onSubmitEditing={this.focusToPassword}
							style={[compStyles.formInput, styles.input]}
						/>
					</View>
					<View
						style={{
							marginTop: 40
						}}
					>
						<TextInput
							autoCorrect={false}
							value={this.state.email}
							placeholder="Email"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="email-address"
							onChangeText={this.emailSet}
							onSubmitEditing={this.focusToPassword}
							style={[compStyles.formInput, styles.input]}
						/>
					</View>
					<View
						style={{
							marginTop: 12
						}}
					>
						<TextInput
							autoCorrect={false}
							value={this.state.email}
							placeholder="Password"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="email-address"
							onChangeText={this.emailSet}
							onSubmitEditing={this.focusToPassword}
							style={[compStyles.formInput, styles.input]}
						/>
					</View>
					<View style={styles.checkboxes}>
						<View
							style={{
								flexDirection: "row"
							}}
						>
							<CheckBox
								value={false}
								disabled={true}
								style={styles.checkbox}
							></CheckBox>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginLeft: 8
								}}
							>
								<Text style={[styles.checkboxText]}>
									Accetta il
								</Text>
								<Text style={[styles.boldText]}>
									Regolamento
								</Text>
							</View>
						</View>
						<View
							style={{
								marginTop: 10,
								flexDirection: "row",
								alignItems: "center"
							}}
						>
							<CheckBox
								value={true}
								disabled={false}
								style={styles.checkbox}
							></CheckBox>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginLeft: 8
								}}
							>
								<Text style={[styles.checkboxText]}>
									Scarico di
								</Text>
								<Text style={[styles.boldText]}>
									Responsabilità
								</Text>
							</View>
						</View>
					</View>
					<View
						style={{
							marginTop: 12
						}}
					>
						<TouchableOpacity
							style={[styles.btnWhite, compStyles.btnWhite]}
							onPress={() => {
								this.goTo("register");
							}}
						>
							<Text style={styles.btnWhiteText}>
								Create Account
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
		height: 38,
		borderRadius: 12,
		borderColor: "white",
		borderWidth: 0.5,
		paddingHorizontal: 14,
		width: Dimensions.get("window").width * 0.7,
		color: "white",
		fontSize: 12,
		fontStyle: "italic",
		fontWeight: "400"
	},
	btnWhite: {
		marginTop: 30,
		backgroundColor: "white",
		paddingVertical: 10,
		paddingHorizontal: 8,
		borderRadius: 12
	},
	btnWhiteText: {
		textAlign: "center",
		color: "#FF2A00",
		fontWeight: "800"
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
	checkboxes: {
		marginTop: 32,
		width: Dimensions.get("window").width * 0.66
	},
	checkbox: {
		width: 14,
		height: 14,
		borderColor: "white",
		borderRadius: 4,
		borderWidth: 0.5
	},
	checkboxText: {
		color: "white",
		fontWeight: "300",
		fontSize: 13,
		fontStyle: "italic"
	},
	boldText: {
		color: "white",
		fontWeight: "400",
		fontSize: 13,
		marginLeft: 4
	},
	logo: {
		width: Dimensions.get("window").width / 4
	}
});

export default Register;
