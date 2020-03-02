import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	ScrollView
} from "react-native";
import { connect } from "react-redux";
import MainTemplate from "../../presentation/MainTemplate";
import UiButton from "../../components/UiButton";
import UiBreadcrumb from "../../components/UiBreadcrumb";
import UiSectionTitle from "../../components/UiSectionTitle";
import DataGroup from "./components/DataGroup";
import config from "../../config";

const { width } = Dimensions.get("window");

import ProfileData from "../../dummies/ProfileData";
const proData = ProfileData[0];

export class Profile extends Component {
	constructor(props) {
		super(props);
	}

	goTo = route => {
		this.props.navigation.navigate(route);
	};

	uppercase = string => {
		if (string && string.length > 2) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		} else if (string) {
			return string;
		} else {
			return "Nessun Valore";
		}
	};

	get user() {
		return this.props.user.user;
	}

	get details() {
		return this.user.details[0];
	}

	get name() {
		return this.uppercase(this.user.name);
	}

	get surname() {
		return this.uppercase(this.user.surname);
	}

	get email() {
		return this.user.email;
	}

	get age() {
		return this.details.age;
	}

	get address() {
		return this.uppercase(this.details.address);
	}

	get city() {
		return this.uppercase(this.details.city);
	}

	render() {
		return (
			<MainTemplate
				fixedView={true}
				onPressTimes="userSelection"
				hasContainer={true}
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
							<UiSectionTitle title="Profilo" />
						</View>
						<View style={styles.container}>
							<View>
								<Text>{this.name}</Text>
								<Text>{this.surname}</Text>
							</View>
							<DataGroup label="indirizzo" value={this.address} />
							{/* <DataGroup
								label="codice postale"
								value={proData.postal_code}
							/> */}
							<DataGroup label="città" value={this.city} />
							{/* <DataGroup label="paese" value={proData.country} /> */}
							<DataGroup
								label="data di nascita"
								value={this.age}
							/>
							{/* <DataGroup label="telefono" value={proData.phone} /> */}
							<DataGroup label="email" value={this.email} />
							<View>
								<UiButton
									title="Modifica profilo"
									fullWidth="0.8"
									onPress={() => {
										this.goTo("profileEdit");
									}}
								/>
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
	}
});

const mapStateToProps = state => {
	return {
		user: state.user,
		token: state.token
	};
};
export default connect(mapStateToProps)(Profile);
