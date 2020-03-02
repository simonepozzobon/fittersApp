import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import config from "../config";
import axios from "axios";

import { setUser, setToken } from "../redux/actions/UserActions";

import MainTemplate from "../presentation/MainTemplate";

export class AuthLoading extends Component {
	constructor(props) {
		super(props);

		this.tryStorageAuth();
	}

	goTo = route => {
		this.props.navigation.navigate(route);
	};

	tryStorageAuth = async () => {
		AsyncStorage.multiGet(["email", "password"], (err, store) => {
			let email = store[0][1],
				password = store[1][1];

			if (err) {
				console.log("errore", err);
			} else {
				this._attemptLogin(email, password);
			}
		});
	};

	_attemptLogin = (email = null, password = null) => {
		if (email && password) {
			let data = new FormData();
			data.append("email", email);
			data.append("password", password);
			axios.post(`${config.api.path}/login`, data).then(response => {
				const { data } = response;
				// console.log(data);
				if (data.success) {
					const { token, user } = data;
					AsyncStorage.multiSet(
						[
							["token", token],
							["user", JSON.stringify(user)],
							["email", email],
							["password", password]
						],
						() => {
							this.props.setUser(user);
							this.props.setToken(token);

							this._redirectAuthorized();
						}
					);
				} else {
					AsyncStorage.multiRemove(
						["token", "user", "email", "password"],
						() => {
							this._redirectUnauthorized();
						}
					);
				}
			});
		} else {
			this._redirectUnauthorized();
		}
	};

	_redirectUnauthorized = () => {
		this.goTo("login");
	};

	_redirectAuthorized = () => {
		// this.goTo("userSelection");
		this.goTo("profileEdit");
	};

	render() {
		return (
			<MainTemplate hasHeader={false}>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<Text>StorageAuth</Text>
				</View>
			</MainTemplate>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
		token: state.token
	};
};
export default connect(mapStateToProps, { setUser, setToken })(AuthLoading);
