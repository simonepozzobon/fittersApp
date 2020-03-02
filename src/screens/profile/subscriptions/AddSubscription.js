import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	ScrollView
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import MainTemplate from "../../../presentation/MainTemplate";
import UiBreadcrumb from "../../../components/UiBreadcrumb";
import UiSectionTitle from "../../../components/UiSectionTitle";
import UiButton from "../../../components/UiButton";

const { width } = Dimensions.get("window");

export class AddSubscription extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: null,
			address: null,
			subType: null,
			subNumber: null,
			subDeadline: null
		};
	}

	setName = value => {
		this.setState({ name: value });
	};
	setAddress = value => {
		this.setState({ address: value });
	};
	setSubType = value => {
		this.setState({ subType: value });
	};
	setSubNumber = value => {
		this.setState({ subNumber: value });
	};
	setSubDeadline = value => {
		this.setState({ subDeadline: value });
	};

	focusToAddress = () => {
		this.addressInput.focus();
	};
	focusToSubType = () => {
		this.subTypeInput.focus();
	};
	focusToSubNumber = () => {
		this.subNumberInput.focus();
	};
	focusToSubDeadline = () => {
		this.subDeadlineInput.focuse();
	};

	_attemptSave = () => {
		if (
			this.state.name &&
			this.state.address &&
			this.state.subType &&
			this.state.subNumber &&
			this.state.subDeadline
		) {
			let data = new FormData();
			data.append("name", this.state.name);
			data.append("address", this.state.address);
			data.append("type", this.state.subType);
			data.append("number", this.state.subNumber);
			data.append("deadline", this.state.subDeadline);

			axios;
		}
	};

	_resetForm = () => {
		this.setState({
			name: null,
			address: null,
			subType: null,
			subNumber: null,
			subDeadline: null
		});
	};

	render() {
		return (
			<MainTemplate
				fixedView={true}
				hasContainer={true}
				onPressTimes="subscription"
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
							<UiSectionTitle title="Aggiungi Abbonamento" />
						</View>
						<View style={styles.container}>
							<View>
								<Text style={styles.label}>palestra</Text>
								<TextInput
									style={[
										styles.input,
										styles.hasMarginTopSm
									]}
									placeholder="Palestra"
									returnKeyType="next"
									keyboardType="default"
									onChangeText={this.setName}
									onSubmitEditing={this.focusToAddress}
									ref={ref => (this.nameInput = ref)}
								/>
							</View>
							<View style={styles.hasMarginTop}>
								<Text style={styles.label}>
									indirizzo palestra
								</Text>
								<TextInput
									style={[
										styles.input,
										styles.hasMarginTopSm
									]}
									placeholder="Indirizzo palestra"
									returnKeyType="next"
									keyboardType="default"
									onChangeText={this.setAddress}
									onSubmitEditing={this.focusToSubType}
									ref={ref => (this.addressInput = ref)}
								/>
							</View>
							<View style={styles.hasMarginTop}>
								<Text style={styles.label}>
									tipo di abbonamento
								</Text>
								<TextInput
									style={[
										styles.input,
										styles.hasMarginTopSm
									]}
									placeholder="Tipo di abbonamento"
									returnKeyType="next"
									keyboardType="default"
									onChangeText={this.setSubType}
									onSubmitEditing={this.focusToSubNumber}
									ref={ref => (this.subTypeInput = ref)}
								/>
							</View>
							<View style={styles.hasMarginTop}>
								<Text style={styles.label}>
									numero abbonamento
								</Text>
								<TextInput
									style={[
										styles.input,
										styles.hasMarginTopSm
									]}
									placeholder="Numero abbonamento"
									returnKeyType="next"
									keyboardType="default"
									onChangeText={this.setSubNumber}
									onSubmitEditing={this.focusToSubDeadline}
									ref={ref => (this.subNumberInput = ref)}
								/>
							</View>
							<View style={styles.hasMarginTop}>
								<Text style={styles.label}>
									scadenza abbonamento
								</Text>
								<TextInput
									style={[
										styles.input,
										styles.hasMarginTopSm
									]}
									placeholder="Scadenza abbonamento"
									keyboardType="default"
									onChangeText={this.setSubDeadline}
									ref={ref => (this.subDeadlineInput = ref)}
								/>
							</View>
							<View style={styles.hasMarginTop}>
								<UiButton
									title="Salva"
									fullWidth="0.8"
									onPress={this._attemptSave}
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

export default AddSubscription;
