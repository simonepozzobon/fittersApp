import React, { Component } from "react";
import {
	Text,
	View,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	ScrollView,
	Alert
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import axios from "axios";

import { setUser, setToken } from "../../redux/actions/UserActions";
import config from "../../config";

import MainTemplate from "../../presentation/MainTemplate";
import UiBreadcrumb from "../../components/UiBreadcrumb";
import UiSectionTitle from "../../components/UiSectionTitle";
import UiButton from "../../components/UiButton";

const { width } = Dimensions.get("window");

export class ProfileEdit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: null,
			surname: null,
			address: null,
			city: null,
			age: null,
			email: null,
			password: null
		};
	}

	componentDidMount() {
		// this.debug();
		// console.log(this.props);
		this._setInitials();
	}

	_setInitials = () => {
		this.setState({
			name: this.props.user.name,
			surname: this.props.user.surname,
			address: this.props.user.details[0].address,
			city: this.props.user.details[0].city,
			age: this.props.user.details[0].age,
			email: this.props.user.email
		});
	};

	goTo = route => {
		this.props.navigation.navigate(route);
	};

	debug = () => {
		setTimeout(() => {
			this.setState({
				name: "Simone",
				surname: "Pozzobon",
				address: "Via Puccini, 10",
				city: "Salzano",
				age: "30",
				email: "info@simonepozzobon.com",
				password: "simone"
			});
		}, 500);
	};

	setName = value => {
		this.setState({ name: value });
	};
	setSurname = value => {
		this.setState({ surname: value });
	};
	setAddress = value => {
		this.setState({ address: value });
	};
	setCity = value => {
		this.setState({ city: value });
	};
	setAge = value => {
		this.setState({ age: value });
	};
	setEmail = value => {
		this.setState({ email: value });
	};
	setPassword = value => {
		this.setState({ password: value });
	};

	focusToSurname = () => {
		this.surnameInput.focus();
	};
	focusToAddress = () => {
		this.addressInput.focus();
	};
	focusToCity = () => {
		this.cityInput.focus();
	};
	focusToAge = () => {
		this.ageInput.focus();
	};
	focusToEmail = () => {
		this.emailInput.focus();
	};
	focusToPassword = () => {
		this.passwordInput.focus();
	};

	_attemptSave = () => {
		if (
			this.state.name &&
			this.state.surname &&
			this.state.address &&
			this.state.city &&
			this.state.age &&
			this.state.email
		) {
			let data = new FormData();
			data.append("name", this.state.name);
			data.append("surname", this.state.surname);
			data.append("address", this.state.address);
			data.append("city", this.state.city);
			data.append("age", this.state.age);
			data.append("email", this.state.email);

			if (this.state.password) {
				data.append("password", this.state.password);
			}

			axios({
				method: "post",
				url: `${config.api.path}/profile/edit`,
				headers: {
					Authorization: `Bearer ${this.props.token}`
				},
				data: data
			})
				.then(response => {
					const { data } = response;
					console.log(data);
					if (data.success) {
						AsyncStorage.setItem(
							"user",
							JSON.stringify(data.user),
							() => {
								this.props.setUser(data.user);
								Alert.alert("Dati aggiornati", "", [
									{
										text: "Ok",
										onPress: () => {
											this.goTo("profileHome");
										}
									}
								]);
							}
						);
					}
				})
				.catch(err => {
					Alert.alert(
						"Errore",
						"C'è state un errore nel salvataggio, riprova.",
						[
							{
								text: "Ok",
								onPress: () => {
									this._resetForm();
								}
							}
						]
					);
				});
		} else {
			Alert.alert("Errore", "Compila tutti i campi");
		}
	};

	_resetForm = () => {
		this.setState({
			name: null,
			surname: null,
			address: null,
			city: null,
			age: null,
			email: null,
			password: null
		});
	};

	render() {
		return (
			<MainTemplate
				fixedView={true}
				hasContainer={true}
				onPressTimes="profileHome"
			>
				<View style={[styles.container, { paddingBottom: 24 }]}>
					<UiBreadcrumb title="Indietro" onPress="back" />
				</View>

				<SafeAreaView style={styles.scrollContainer}>
					<ScrollView
						contentContainerStyle={styles.content}
						showsVerticalScrollIndicator={false}
						centerContent={true}
					>
						<View style={[styles.container, { marginBottom: 32 }]}>
							<UiSectionTitle title="Modifica Profilo" />
						</View>

						<View style={styles.container}>
							<View>
								<Text style={styles.label}>nome</Text>
								<TextInput
									style={[
										styles.input,
										styles.hasMarginTopSm
									]}
									placeholder="Nome"
									returnKeyType="next"
									keyboardType="default"
									onChangeText={this.setName}
									onSubmitEditing={this.focusToSurname}
									ref={ref => (this.nameInput = ref)}
									value={this.state.name}
								/>
							</View>
							<View style={styles.hasMarginTop}>
								<Text style={styles.label}>cognome</Text>
								<TextInput
									style={[
										styles.input,
										styles.hasMarginTopSm
									]}
									placeholder="Cognome"
									returnKeyType="next"
									keyboardType="default"
									onChangeText={this.setSurname}
									onSubmitEditing={this.focusToAddress}
									ref={ref => (this.surnameInput = ref)}
									value={this.state.surname}
								/>
							</View>
							<View style={styles.hasMarginTop}>
								<Text style={styles.label}>indirizzo</Text>
								<TextInput
									style={[
										styles.input,
										styles.hasMarginTopSm
									]}
									placeholder="Indirizzo"
									returnKeyType="next"
									keyboardType="default"
									onChangeText={this.setAddress}
									onSubmitEditing={this.focusToCity}
									ref={ref => (this.addressInput = ref)}
									value={this.state.address}
								/>
							</View>
							<View style={styles.hasMarginTop}>
								<Text style={styles.label}>città</Text>
								<TextInput
									style={[
										styles.input,
										styles.hasMarginTopSm
									]}
									placeholder="Città"
									returnKeyType="next"
									keyboardType="default"
									onChangeText={this.setCity}
									onSubmitEditing={this.focusToAge}
									ref={ref => (this.cityInput = ref)}
									value={this.state.city}
								/>
							</View>
							<View style={styles.hasMarginTop}>
								<Text style={styles.label}>età</Text>
								<TextInput
									style={[
										styles.input,
										styles.hasMarginTopSm
									]}
									placeholder="Età"
									returnKeyType="next"
									keyboardType="default"
									onChangeText={this.setAge}
									onSubmitEditing={this.focusToEmail}
									ref={ref => (this.ageInput = ref)}
									value={this.state.age}
								/>
							</View>
							<View style={styles.hasMarginTop}>
								<Text style={styles.label}>email</Text>
								<TextInput
									style={[
										styles.input,
										styles.hasMarginTopSm
									]}
									placeholder="Email"
									returnKeyType="next"
									keyboardType="default"
									onChangeText={this.setEmail}
									onSubmitEditing={this.focusToPassword}
									ref={ref => (this.emailInput = ref)}
									value={this.state.email}
								/>
							</View>
							<View style={styles.hasMarginTop}>
								<Text style={styles.label}>password</Text>
								<TextInput
									style={[
										styles.input,
										styles.hasMarginTopSm
									]}
									autoCorrect={false}
									placeholder="Password"
									keyboardType="default"
									onChangeText={this.setPassword}
									ref={ref => (this.passwordInput = ref)}
									value={this.state.password}
								/>
							</View>

							<View style={styles.hasMarginTop}>
								<View>
									<UiButton
										title="Salva"
										fullWidth="0.8"
										onPress={this._attemptSave}
									/>
								</View>
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
			</MainTemplate>
		);
	}
}

const styles = StyleSheet.create({
	scrollContainer: {
		width: width
	},
	container: {
		width: width * 0.8
	},
	content: {
		alignItems: "center",
		justifyContent: "center"
	},
	label: {
		fontSize: 9,
		fontWeight: "300"
	},
	cardInput: {
		width: width * 0.8
	},
	input: {
		height: 38,
		borderRadius: 12,
		borderColor: "#252525",
		borderWidth: 0.5,
		paddingHorizontal: 14,
		color: "#252525",
		fontSize: 12,
		fontWeight: "400"
	},
	hasMarginTop: {
		marginTop: 12
	},
	hasMarginTopSm: {
		marginTop: 8
	}
});

const mapPropsToState = state => {
	return {
		...state.user,
		...state.token
	};
};

export default connect(
	mapPropsToState,
	{
		setUser,
		setToken
	},
	(stateProps, dispatchProps, ownProps) => {
		return {
			...ownProps,
			...stateProps,
			...dispatchProps
		};
	}
)(ProfileEdit);
