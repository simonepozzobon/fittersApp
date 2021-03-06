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
	SafeAreaView,
	Modal,
	TouchableWithoutFeedback
} from "react-native";

import MainTemplate from "../../presentation/MainTemplate";
import Header from "../../presentation/Header";
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
import _ from "lodash";

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
			markedDates: {},
			mode: "single",
			modalVisible: false
		};
	}
	goTo(route) {
		this.props.navigation.navigate(route);
	}

	setSubscription(itemValue, itemIndex) {
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
			if (this.state.mode == "multiple") {
				let startDate = null;
				let startDateKey = null;
				for (const key in markedDates) {
					if (markedDates.hasOwnProperty(key)) {
						// delete markedDates[key].selected;
						if (markedDates[key].hasOwnProperty("current")) {
							startDate = markedDates[key];
							startDateKey = key;
						}
					}
				}

				if (startDate == null) {
					markedDates[day.dateString] = {
						selected: true,
						marked: true,
						startingDay: true,
						current: true,
						color: "#FF2A00"
					};
				} else {
					let endDateKey;

					delete markedDates[startDateKey].current;
					if (startDateKey < day.dateString) {
						markedDates[day.dateString] = {
							selected: true,
							marked: true,
							endingDay: true,
							color: "#FF2A00"
						};

						endDateKey = day.dateString;
					} else {
						delete markedDates[startDateKey].startingDay;
						markedDates[startDateKey].endingDay = true;

						markedDates[day.dateString] = {
							selected: true,
							marked: true,
							startingDay: true,
							color: "#FF2A00"
						};

						endDateKey = startDateKey;
						startDateKey = day.dateString;
					}

					startDateKey = moment(startDateKey, "YYYY-MM-DD");
					endDateKey = moment(endDateKey, "YYYY-MM-DD").subtract(
						1,
						"days"
					);
					while (startDateKey < endDateKey) {
						startDateKey.add(1, "days");

						let currentKey = moment(startDateKey)
							.format("YYYY-MM-DD")
							.toString();

						markedDates[currentKey] = {
							selected: true,
							marked: true,
							color: "#FF2A00"
						};
					}

					this.setState({ mode: "single" });
				}
			} else {
				markedDates[day.dateString] = {
					selected: true,
					marked: true,
					startingDay: true,
					endingDay: true,
					color: "#FF2A00"
				};
			}
		}

		for (const key in markedDates) {
			if (markedDates.hasOwnProperty(key)) {
				let dateObj = moment(key, "YYYY-MM-DD")
					.format("DD MMMM YYYY")
					.toString();
				selectedDates.push(dateObj);
			}
		}

		selectedDates = Object.assign(
			[],
			_.orderBy(
				selectedDates,
				item => {
					return moment(item, "DD MMMM YYYY");
				},
				["asc"]
			)
		);
		console.log(selectedDates);

		this.setState({
			selectedDates,
			markedDates
		});
	}

	closeModal() {
		this.setState({
			modalVisible: false
		});
	}

	show() {
		this.setState({
			modalVisible: false
		});

		setTimeout(() => {
			this.setState({
				modalVisible: true
			});
		}, 1);
	}

	multipleDaysSelect(day) {
		this.setState({
			mode: "multiple"
		});

		setTimeout(() => {
			this.daySelect(day);
		}, 1);
	}

	render() {
		let animationPanel = {
			transform: [
				{
					translateY: this.state.bounceValue
				}
			]
		};

		return (
			<MainTemplate
				onPressTimes="userSelection"
				hasContainer={true}
				fixedView={true}
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
						<View style={styles.container}>
							<UiPageTitle title="Cedi Ingresso" />
						</View>
						<View style={{ marginTop: 24 }}>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={this.show.bind(this)}
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

									dotColor: "blue",
									selectedDotColor: "blue",
									selectedDayBackgroundColor: "#FF2A00",
									selectedDayTextColor: "white",

									indicatorColor: "blue"
								}}
								// current={this.state.startDate}
								minDate={this.state.startDate}
								markedDates={this.state.markedDates}
								// maxDate={"2012-05-30"}
								onDayPress={this.daySelect.bind(this)}
								onDayLongPress={this.multipleDaysSelect.bind(
									this
								)}
								monthFormat={"MMMM - yyyy"}
								markingType={"period"}
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
							<Text style={styles.value}>
								{this.state.subscription}
							</Text>
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
							fullWidth="0.8"
							onPress={() => {
								this.goTo("saleCompleted");
							}}
						/>
					</ScrollView>
				</SafeAreaView>
				<View>
					<Modal
						visible={this.state.modalVisible}
						presentationStyle="overFullScreen"
						transparent={true}
						animationType="fade"
					>
						<TouchableWithoutFeedback
							onPress={() => {
								this.closeModal();
							}}
						>
							<View
								style={{
									position: "absolute",
									top: 0,
									bottom: 0,
									left: 0,
									right: 0,
									backgroundColor: "rgba(255, 255, 255, 0.5)"
								}}
							></View>
						</TouchableWithoutFeedback>
						<View
							style={{
								bottom: height * 0.3,
								position: "absolute",
								alignSelf: "center"
							}}
						>
							<View
								style={{
									width: width * 0.8,
									backgroundColor: "white",
									padding: 32,
									borderRadius: 12,
									shadowColor: "rgba(0, 0, 0, 0.1)",
									shadowOpacity: 0.6,
									elevation: 4,
									shadowRadius: 8,
									shadowOffset: {
										width: 1,
										height: 6
									}
								}}
							>
								<Picker
									selectedValue={this.state.subscription}
									style={styles.subscriptionSelect}
									onValueChange={this.setSubscription.bind(
										this
									)}
								>
									{DummySubs.map(item => (
										<Picker.Item
											key={item.id}
											label={item.label}
											value={item.value}
										/>
									))}
								</Picker>
							</View>
							<View>
								<UiButton
									title="Conferma"
									fullWidth="0.8"
									onPress={() => {
										this.closeModal();
									}}
								/>
							</View>
						</View>
					</Modal>
				</View>
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
		width: width * 0.8,
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
	subscriptionSelect: {},
	subscriptionSelectBtn: {
		// marginBottom: 32
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
	}
});

export default CediIngresso;
