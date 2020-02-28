import React, { Component } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import config from "../config";
import axios from "axios";

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
				console.error(err);
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
				if (data.success) {
					const { token, user } = data;
					AsyncStorage.setItem("token", token);
					AsyncStorage.setItem("user", JSON.stringify(user));
					AsyncStorage.setItem("email", email);
					AsyncStorage.setItem("password", password);
					this._redirectAuthorized();
				} else {
					this._redirectUnauthorized();
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
		this.goTo("userSelection");
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

export default AuthLoading;
