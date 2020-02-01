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
	Picker,
	ScrollView,
	SafeAreaView
} from "react-native";

import MainTemplate from "../../presentation/MainTemplate";
import Header from "../../presentation/Header";
import MapTopBar from "../../components/MapTopBar";
import MarkerData from "../../dummies/Marker";
import UiButton from "../../components/UiButton";
import UiBreadcrumb from "../../components/UiBreadcrumb";
import UiSectionTitle from "../../components/UiSectionTitle";
import UiPageTitle from "../../components/UiPageTitle";
import CalendarPicker from "react-native-calendar-picker";

import moment from "moment";

const Pin = require("../../../assets/Pin.png");
const arrowUp = require("../../../assets/arrow_up.png");
const arrowDown = require("../../../assets/arrow_down.png");
const payments = require("../../../assets/payments.png");
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
			<MainTemplate onPressTimes="userSelection" hasContainer={true}>
				<View style={styles.container}>
					<UiBreadcrumb title="Indietro" onPress="back" />
				</View>
				<View style={{ width: width * 0.8, marginTop: 24 }}>
					<UiSectionTitle title="Hai selezionato:" />
				</View>
				<SafeAreaView style={styles.scrollContainer}>
					<ScrollView
						contentContainerStyle={styles.content}
						showsVerticalScrollIndicator={false}
						centerContent={true}
					>
						<View style={{ width: width * 0.7, marginTop: 24 }}>
							<Text style={styles.label}>Palestra</Text>
							<Text style={styles.value}>Pure Fitness</Text>
						</View>
						<View style={{ width: width * 0.7, marginTop: 12 }}>
							<Text style={styles.label}>Indirizzo palestra</Text>
							<Text style={styles.value}>
								Via Santa Margherita, 10
							</Text>
						</View>
						<View style={{ width: width * 0.7, marginTop: 12 }}>
							<Text style={styles.label}>Codice postale</Text>
							<Text style={styles.value}>12345</Text>
						</View>
						<View style={{ width: width * 0.7, marginTop: 12 }}>
							<Text style={styles.label}>Città</Text>
							<Text style={styles.value}>Milano</Text>
						</View>
						<View style={{ width: width * 0.7, marginTop: 12 }}>
							<Text style={styles.label}>Paese</Text>
							<Text style={styles.value}>Italia</Text>
						</View>
						<View style={{ width: width * 0.7, marginTop: 12 }}>
							<Text style={styles.label}>
								Giorni prenotazione
							</Text>
							<Text style={styles.value}>15/12/2020</Text>
						</View>
						<View style={{ width: width * 0.7, marginTop: 12 }}>
							<Text style={styles.label}>Ore</Text>
							<Text style={styles.value}>18:30</Text>
						</View>
						<View style={{ width: width * 0.8, marginTop: 24 }}>
							<UiSectionTitle title="Costo Ingresso:" />
						</View>
						<View style={{ width: width * 0.8, marginTop: 6 }}>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "flex-start"
								}}
							>
								<Text style={styles.panelPrice}>€ 5</Text>
								<Text style={styles.panelPriceDecimal}>
									,00
								</Text>
							</View>
						</View>
						<View style={{ marginTop: 24 }}>
							<Text>Seleziona il metodo di pagamento</Text>
						</View>
						<View style={{ marginBottom: -24 }}>
							<Image
								source={payments}
								resizeMode="contain"
								style={styles.payments}
							/>
						</View>
						<View
							style={{
								marginTop: 0,
								width: width,
								flexDirection: "row",
								justifyContent: "center"
							}}
						>
							<UiButton
								title="Paga e prenota"
								fullWidth="0.8"
								onPress={() => {
									this.goTo("buyCompleted");
								}}
							/>
						</View>
					</ScrollView>
				</SafeAreaView>
			</MainTemplate>
		);
	}
}

const styles = StyleSheet.create({
	// Forms
	container: {
		width: width * 0.8
	},
	scrollContainer: {
		width: width * 0.8
	},
	content: {
		// flex: 1,
		alignItems: "center",
		justifyContent: "center"
		// flexGrow: 1,
		// height: '100%',
		// backgroundColor: 'blue',
	},
	label: {
		fontSize: 9,
		fontWeight: "300"
	},
	value: {
		fontSize: 14
	},
	payments: {
		width: 230,
		height: 140
	},
	panelPrice: {
		fontSize: 28,
		fontWeight: "900",
		color: "#FC2D1C"
	},
	panelPriceDecimal: {
		fontSize: 18,
		fontWeight: "900",
		color: "#FC2D1C"
	}
});

export default CediIngresso;
