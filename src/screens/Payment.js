import React, { Component } from "react";
import {
	Text,
	View,
	Dimensions,
	StyleSheet,
	SafeAreaView,
	ScrollView
} from "react-native";
import MainTemplate from "../presentation/MainTemplate";
import UiButton from "../components/UiButton";
import UiContainer from "../components/UiContainer";
import UiSectionTitle from "../components/UiSectionTitle";
import UiBreadcrumb from "../components/UiBreadcrumb";
import { TextInput } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export class Payment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cardNumber: null,
			cardExp: null,
			cardCvv: null
		};
	}

	_handlingCardNumber(number) {
		this.setState({
			cardNumber: number
				.replace(/\s?/g, "")
				.replace(/(\d{4})/g, "$1 ")
				.trim()
		});
	}

	_handlingCardExp(number) {
		this.setState({
			cardExp: number
		});
	}

	_handlingCardCvv(number) {
		this.setState({
			cardCvv: number
		});
	}

	render() {
		return (
			<MainTemplate onPressTimes="back">
				<UiContainer>
					<View style={[styles.container, { paddingBottom: 24 }]}>
						<UiBreadcrumb
							title="Indietro"
							onPress={() => {
								this.props.navigation.goBack();
							}}
						/>
					</View>

					<SafeAreaView style={styles.scrollContainer}>
						<ScrollView
							contentContainerStyle={styles.content}
							showsVerticalScrollIndicator={false}
							centerContent={true}
						>
							<View
								style={[styles.container, { marginBottom: 32 }]}
							>
								<UiSectionTitle title="Pagamento" />
							</View>
							<View style={styles.container}>
								<Text style={styles.label}>Numero Carta</Text>
								<TextInput
									style={[
										styles.cardInput,
										styles.input,
										styles.hasMarginTop
									]}
									onChangeText={text =>
										this._handlingCardNumber(text)
									}
									keyboardType="number-pad"
									autoCompleteType="cc-number"
									maxLength={16}
									textContentType="creditCardNumber"
									placeholder="0000 0000 0000 0000"
									value={this.cardNumber}
								/>
							</View>
							<View
								style={[
									styles.container,
									{
										marginTop: 24,
										flexDirection: "row"
									}
								]}
							>
								<View>
									<Text style={styles.label}>Scadenza</Text>
									<TextInput
										style={[
											styles.input,
											styles.hasMarginTop
										]}
										onChangeText={text =>
											this._handlingCardExp(text)
										}
										keyboardType="number-pad"
										autoCompleteType="cc-exp"
										maxLength={5}
										textContentType="creditCardNumber"
										placeholder="MM/YY"
										value={this.cardExp}
									/>
								</View>
								<View style={{ marginLeft: 24 }}>
									<Text style={styles.label}>CVV</Text>
									<TextInput
										style={[
											styles.input,
											styles.hasMarginTop
										]}
										onChangeText={text =>
											this._handlingCardCvv(text)
										}
										keyboardType="number-pad"
										autoCompleteType="cc-csc"
										maxLength={4}
										textContentType="creditCardNumber"
										placeholder="CVV"
										value={this.cardCvv}
									/>
								</View>
							</View>
							<View>
								<UiButton
									title="Aggiorna Metodo di Pagamento"
									fullWidth="0.8"
									onPress={() => {}}
								/>
							</View>
						</ScrollView>
					</SafeAreaView>
				</UiContainer>
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
	}
});

export default Payment;
