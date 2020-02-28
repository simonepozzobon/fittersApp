import React, { Component } from "react";

import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TextInput,
	TouchableOpacity,
	Image,
	Alert
} from "react-native";
import axios from "axios";
import config from "../config";

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
			name: "",
			surname: "",
			age: "",
			address: "",
			city: "",
			email: "",
			password: "",
			agreement: false,
			responsability: false
		};
	}

	// Component State Management

	componentDidMount() {
		this.setState({
			screenWidth: Dimensions.get("window").width
		});

		this.debug();
	}

	// Methods

	debug = () => {
		setTimeout(() => {
			this.setState({
				name: "Simone",
				surname: "Pozzobon",
				age: "30",
				address: "Via Puccini, 10",
				city: "Salzano",
				email: "info@simonepozzobon.com",
				password: "password",
				agreement: true,
				responsability: true
			});
		}, 500);
	};

	/**
	 * @param {string} route
	 */
	goTo(route) {
		this.props.navigation.navigate(route);
	}

	nameSet = value => {
		this.setState({ name: value });
	};

	surnameSet = value => {
		this.setState({ surname: value });
	};

	ageSet = value => {
		this.setState({ age: value });
	};

	addressSet = value => {
		this.setState({ address: value });
	};

	citySet = value => {
		this.setState({ city: value });
	};

	emailSet = value => {
		this.setState({ email: value });
	};

	passwordSet = value => {
		this.setState({ password: value });
	};

	focusToSurname = () => {
		this.surnameInput.focus();
	};

	focusToAge = () => {
		this.ageInput.focus();
	};

	focusToAddress = () => {
		this.addressInput.focus();
	};

	focusToCity = () => {
		this.cityInput.focus();
	};

	focusToEmail = () => {
		this.emailInput.focus();
	};

	focusToPassword = () => {
		this.passwordInput.focus();
	};

	toggleAgreement = () => {
		let value = this.state.agreement;
		this.setState({ agreement: !value });
	};

	toggleResponsability = () => {
		let value = this.state.responsability;
		this.setState({ responsability: !value });
	};

	attemptRegistration = () => {
		if (
			this.state.name &&
			this.state.surname &&
			this.state.age &&
			this.state.address &&
			this.state.city &&
			this.state.email &&
			this.state.password &&
			this.state.responsability &&
			this.state.agreement
		) {
			let data = new FormData();
			data.append("name", this.state.name);
			data.append("surname", this.state.surname);
			data.append("age", this.state.age);
			data.append("address", this.state.address);
			data.append("city", this.state.city);
			data.append("email", this.state.email);
			data.append("password", this.state.password);

			axios
				.post(`${config.api.path}/register`, data)
				.then(response => {
					const { data } = response;
					console.log("response", data);
					if (data.success) {
					} else {
						if (data.message == "same-email") {
							Alert.alert("Errore", "La mail è già registrata", [
								{
									text: "OK",
									onPress: () => {
										this.setState({
											password: null,
											email: null
										});
									}
								}
							]);
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	_resetForm = () => {
		this.setState({
			name: null,
			surname: null,
			age: null,
			address: null,
			city: null,
			email: null,
			password: null,
			agreement: false,
			responsability: false
		});
	};

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
			},
			agreement: {
				backgroundColor: this.state.agreement ? "white" : "transparent"
			},
			responsability: {
				backgroundColor: this.state.responsability
					? "white"
					: "transparent"
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
							value={this.state.name}
							placeholder="Name"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="default"
							onChangeText={this.nameSet}
							onSubmitEditing={this.focusToSurname}
							style={[compStyles.formInput, styles.input]}
						/>
					</View>
					<View
						style={{
							marginTop: 12
						}}
					>
						<TextInput
							value={this.state.surname}
							placeholder="Surname"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="default"
							onChangeText={this.surnameSet}
							onSubmitEditing={this.focusToAge}
							style={[compStyles.formInput, styles.input]}
							ref={ref => (this.surnameInput = ref)}
						/>
					</View>
					<View
						style={{
							marginTop: 12
						}}
					>
						<TextInput
							value={this.state.age}
							placeholder="Age"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="number-pad"
							onChangeText={this.ageSet}
							onSubmitEditing={this.focusToAddress}
							style={[compStyles.formInput, styles.input]}
							ref={ref => (this.ageInput = ref)}
						/>
					</View>
					<View
						style={{
							marginTop: 12
						}}
					>
						<TextInput
							value={this.state.address}
							placeholder="Indirizzo"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="default"
							onChangeText={this.addressSet}
							onSubmitEditing={this.focusToCity}
							style={[compStyles.formInput, styles.input]}
							ref={ref => (this.addressInput = ref)}
						/>
					</View>
					<View
						style={{
							marginTop: 12
						}}
					>
						<TextInput
							value={this.state.city}
							placeholder="Città"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="default"
							onChangeText={this.citySet}
							onSubmitEditing={this.focusToEmail}
							style={[compStyles.formInput, styles.input]}
							ref={ref => (this.cityInput = ref)}
						/>
					</View>
					<View
						style={{
							marginTop: 40
						}}
					>
						<TextInput
							value={this.state.email}
							placeholder="Email"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="email-address"
							onChangeText={this.emailSet}
							onSubmitEditing={this.focusToPassword}
							style={[compStyles.formInput, styles.input]}
							ref={ref => (this.emailInput = ref)}
						/>
					</View>
					<View
						style={{
							marginTop: 12
						}}
					>
						<TextInput
							secureTextEntry
							autoCorrect={false}
							value={this.state.password}
							placeholder="Password"
							placeholderTextColor="white"
							returnKeyType="next"
							keyboardType="default"
							onChangeText={this.passwordSet}
							// onSubmitEditing={this.attemptRegistration}
							style={[compStyles.formInput, styles.input]}
							ref={ref => (this.passwordInput = ref)}
						/>
					</View>
					<View style={styles.checkboxes}>
						<View
							style={{
								flexDirection: "row"
							}}
						>
							<TouchableOpacity onPress={this.toggleAgreement}>
								<CheckBox
									value={this.state.agreement}
									disabled={true}
									style={[
										styles.checkbox,
										compStyles.agreement
									]}
								></CheckBox>
							</TouchableOpacity>
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
							<TouchableOpacity
								onPress={this.toggleResponsability}
							>
								<CheckBox
									value={this.state.responsability}
									disabled={false}
									style={[
										styles.checkbox,
										compStyles.responsability
									]}
								></CheckBox>
							</TouchableOpacity>
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
								this.attemptRegistration();
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
