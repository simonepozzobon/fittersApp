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
import UiContainer from "../../components/UiContainer";
import UiPageTitle from "../../components/UiPageTitle";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import UiBreadcrumb from "../../components/UiBreadcrumb";

import moment from "moment";
import "moment/locale/it";
moment.locale("it");

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

LocaleConfig.locales["it"] = {
	monthNames: [
		"Gennaio",
		"Febbraio",
		"Marzo",
		"Aprile",
		"Maggio",
		"Giugno",
		"Luglio",
		"Agosto",
		"Settembre",
		"Ottobre",
		"Novembre",
		"Dicembre"
	],
	monthNamesShort: [
		"Gen.",
		"Feb.",
		"Mar.",
		"Apr.",
		"Mag.",
		"Giu.",
		"Lug.",
		"Ago.",
		"Set.",
		"Ott.",
		"Nov.",
		"Dic."
	],
	dayNames: [
		"Domenica",
		"Lunedì",
		"Martedì",
		"Mercoledì",
		"Giovedì",
		"Venerdì",
		"Sabato"
	],
	dayNamesShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
	today: "Oggi"
};
LocaleConfig.defaultLocale = "it";

class CediIngresso extends Component {
	constructor() {
		super();
		this.state = {
			startDate: new Date(),
			selectedStartDate: null,
			subscriptionTxt: "Seleziona Abbonamento",
			subscription: null,
			selectedDates: [],
			bounceValue: new Animated.Value(height),
			markedDates: {}
		};
	}

	// Component State Management

	componentDidMount() {
		// this.setState({
		// 	screenWidth: width
		// });
	}

	// Methods

	goTo(route) {
		this.props.navigation.navigate(route);
	}

	// onDateChange(date) {
	// 	let hDate = moment(date).format("d MMMM YYYY");
	// 	this.setState({
	// 		selectedStartDate: date,
	// 		selectedDates: hDate
	// 	});
	// }

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

	daySelect(day) {
		let markedDates = Object.assign({}, this.state.markedDates);
		let selectedDates = [];

		if (markedDates.hasOwnProperty(day.dateString)) {
			delete markedDates[day.dateString];
		} else {
			markedDates[day.dateString] = {
				selected: true
			};
		}

		for (const key in markedDates) {
			if (markedDates.hasOwnProperty(key)) {
				let dateObj = moment(key, "YYYY-MM-DD")
					.format("DD MMMM YYYY")
					.toString();
				selectedDates.push(dateObj);
			}
		}

		this.setState({
			selectedDates,
			markedDates
		});
	}

	// Render
	render() {
		// Dynamic styles

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
				<View style={[styles.container, { paddingBottom: 24 }]}>
					<UiBreadcrumb title="Indietro" onPress="back" />
				</View>
				<View style={styles.container}>
					<UiPageTitle title="Cedi Ingresso" />
				</View>
				<View style={{ marginTop: 24 }}>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={this._toggleSubView.bind(this)}
						style={styles.selector}
					>
						<Text style={styles.selectorText}>
							{this.state.subscriptionTxt}
						</Text>
						<Image
							source={arrowDown}
							resizeMode="contain"
							style={{
								width: 15,
								height: 15
							}}
						/>
					</TouchableOpacity>
				</View>
				<View style={[styles.calendar, { marginTop: 24 }]}>
					<Calendar
						style={{
							width: width * 0.8,
							borderColor: "#252525",
							borderWidth: 0.5,
							borderRadius: 12
						}}
						theme={{
							backgroundColor: "transparent",
							calendarBackground: "transparent",
							arrowColor: "#252525",
							textSectionTitleColor: "#252525",
							monthTextColor: "#252525",
							indicatorColor: "#252525",
							todayTextColor: "rgba(255, 42, 0, 0.5)",
							textDayHeaderFontSize: 10,
							textDayFontWeight: "400",
							dayTextColor: "#252525",
							textDisabledColor: "rgba(37,37,37, 0.1)",

							dotColor: "#ffffff",
							selectedDotColor: "blue",
							selectedDayBackgroundColor: "#FF2A00",
							selectedDayTextColor: "white"
						}}
						// current={this.state.startDate}
						minDate={this.state.startDate}
						markedDates={this.state.markedDates}
						// maxDate={"2012-05-30"}
						onDayPress={this.daySelect.bind(this)}
						monthFormat={"MMMM - yyyy"}
						// onMonthChange={month => {
						// 	console.log("month changed", month);
						// }}
						// hideExtraDays={true}
						firstDay={1}
						// onPressArrowLeft={substractMonth =>
						// 	substractMonth()
						// }
						// onPressArrowRight={addMonth => addMonth()}
					/>
				</View>
				<View style={{ marginTop: 24 }}>
					<Text style={styles.label}>Stai cedendo:</Text>
					<Text style={styles.value}>{this.state.subscription}</Text>
				</View>
				<View style={{ marginTop: 24 }}>
					<Text style={styles.label}>Per i giorni:</Text>
					{this.state.selectedDates.map(date => (
						<Text key={date} style={styles.value}>
							{date}
						</Text>
					))}
				</View>
				<UiButton
					title="Cedi Ingresso"
					fullWidth="0.7"
					onPress={() => {
						this.goTo("saleCompleted");
					}}
				/>
				<Animated.View style={[styles.subView, animationPanel]}>
					<Picker
						selectedValue={this.state.subscription}
						style={styles.subscriptionSelect}
						onValueChange={this.setSubscription.bind(this)}
					>
						{DummySubs.map(item => (
							<Picker.Item
								key={item.id}
								label={item.label}
								value={item.value}
							/>
						))}
					</Picker>
					<View style={styles.subscriptionSelectBtn}>
						<UiButton
							title="Conferma"
							fullWidth="0.8"
							onPress={this._toggleSubView.bind(this)}
						/>
					</View>
				</Animated.View>
			</MainTemplate>
		);
	}
}

const styles = StyleSheet.create({
	// Forms
	container: {
		width: width * 0.8
	},
	label: {
		textAlign: "center"
	},
	value: {
		fontWeight: "700",
		textAlign: "center"
	},
	selectedDayStyle: {
		backgroundColor: "#FC2D1C"
	},
	dayLabelsWrapper: {
		borderBottomWidth: 0,
		borderTopWidth: 0
	},
	dayOfWeekStyles: {
		fontSize: 10
	},
	textStyle: {
		fontSize: 14
	},
	selector: {
		width: width * 0.7,
		borderWidth: 0.5,
		borderColor: "#252525",
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 12,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	selectorText: {
		color: "#FC2D1C",
		fontSize: 12,
		fontWeight: "700"
	},
	subscriptionSelect: {
		width: width
	},
	subscriptionSelectBtn: {
		marginBottom: 32
	},
	subView: {
		zIndex: 2,
		position: "absolute",
		width: width,
		backgroundColor: "#f7f7f7",
		flexDirection: "column",
		alignItems: "center",
		bottom: 0,
		left: 0,
		right: 0
	}
});

export default CediIngresso;
