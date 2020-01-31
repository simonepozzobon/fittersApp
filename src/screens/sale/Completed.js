import React, { Component } from "react";

import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TextInput,
	TouchableOpacity,
	Image,
	Animated,
	Picker
} from "react-native";

import MainTemplate from "../../presentation/MainTemplate";
import Header from "../../presentation/Header";
import MapTopBar from "../../components/MapTopBar";
import MarkerData from "../../dummies/Marker";
import UiButton from "../../components/UiButton";
import UiBreadcrumb from "../../components/UiBreadcrumb";
import UiContainer from "../../components/UiContainer";
import UiPageTitle from "../../components/UiPageTitle";
import CalendarPicker from "react-native-calendar-picker";
import LinearGradient from "react-native-linear-gradient";

import moment from "moment";

const Pin = require("../../../assets/Pin.png");
const arrowUp = require("../../../assets/arrow_up.png");
const arrowDown = require("../../../assets/arrow_down.png");
const logo = require("../../../assets/brand/logo.png");

const { width, height } = Dimensions.get("window");

let isHidden = true;

const DummySubs = [
	{
		id: 1,
		label: "Abbonamento Virgin",
		value: "AX 567"
	},
	{
		id: 2,
		label: "Abbonamento GetFit",
		value: "AX 234"
	},
	{
		id: 3,
		label: "Abbonamento Pure Fitness",
		value: "AX 438"
	}
];

class CediIngresso extends Component {
	constructor() {
		super();
		this.state = {
			selectedStartDate: null,
			subscriptionTxt: "Seleziona Abbonamento",
			subscription: null,
			selectedDates: null,
			bounceValue: new Animated.Value(height)
		};
	}

	// Component State Management

	componentDidMount() {
		this.setState({
			screenWidth: width
		});
	}

	// Methods

	goTo(route) {
		this.props.navigation.navigate(route);
	}

	onDateChange(date) {
		let hDate = moment(date).format("d MMMM YYYY");
		this.setState({
			selectedStartDate: date,
			selectedDates: hDate
		});
	}

	_toggleSubView() {
		let toValue = height;
		if (!isHidden) {
			toValue = 0;
		}
		console.log(toValue);

		Animated.spring(this.state.bounceValue, {
			toValue: toValue,
			duration: 600,
			velocity: 3,
			tension: 2,
			friction: 6,
			useNativeDriver: true
		}).start();

		isHidden = !isHidden;
	}

	setSubscription(itemValue, itemIndex) {
		console.log(itemValue);
		this.setState({
			subscription: itemValue,
			subscriptionTxt: DummySubs.find(sub => sub.value == itemValue).label
		});
	}

	// Render
	render() {
		// Dynamic styles
		const { selectedStartDate } = this.state;
		const startDate = selectedStartDate ? selectedStartDate.toString() : "";

		let animationPanel = {
			transform: [
				{
					translateY: this.state.bounceValue
				}
			]
		};

		// Component
		return (
			<MainTemplate
				onPressTimes={() => {
					this.goTo("userSelection");
				}}
			>
				<UiContainer>
					<View style={styles.container}>
						<UiBreadcrumb
							title="Cedi Ingresso"
							onPress={() => {
								this.goTo("saleSettings");
							}}
						/>
					</View>
					<View style={styles.content}>
						<View>
							<Text style={styles.mainText}>GRAZIE !</Text>
						</View>
						<View style={{ marginTop: 24 }}>
							<LinearGradient
								colors={["#ff2a00", "#FF2A00"]}
								start={{ x: 0.0, y: 0.25 }}
								end={{ x: 0.5, y: 1.0 }}
								style={styles.panelGradient}
							>
								<View>
									<Text style={styles.contentText}>
										Hai messo a disposizione
									</Text>
									<Text style={styles.contentText}>
										il tuo abbonamento
									</Text>
								</View>
								<View style={{ marginTop: 24 }}>
									<Text style={styles.contentText}>
										Riceverai una notifica
									</Text>
									<Text style={styles.contentText}>
										appena verrà usato
									</Text>
								</View>
							</LinearGradient>
						</View>
					</View>
					<View style={{ marginBottom: 60 }}>
						<UiButton
							title="Esci"
							fullWidth="0.7"
							onPress={() => {
								this.goTo("userSelection");
							}}
						/>
					</View>
				</UiContainer>
			</MainTemplate>
		);
	}
}

const styles = StyleSheet.create({
	// Forms
	container: {
		width: width * 0.8
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 100
	},
	mainText: {
		color: "#FC2D1C",
		fontSize: 44,
		fontWeight: "800",
		fontStyle: "italic"
	},
	panelGradient: {
		width: width * 0.8,
		borderRadius: 14,
		paddingVertical: 48,
		justifyContent: "center",
		alignItems: "center"
	},
	contentText: {
		textAlign: "center",
		color: "white",
		fontSize: 18,
		fontWeight: "700"
	}
});

export default CediIngresso;
