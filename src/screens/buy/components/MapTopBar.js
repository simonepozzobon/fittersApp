import React, { Component, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	Platform,
	Animated,
	Easing,
	Dimensions,
	Modal,
	TouchableWithoutFeedback
} from "react-native";
import UiButton from "../../../components/UiButton";
import UiSectionTitle from "../../../components/UiSectionTitle";

const arrowDown = require("../../../../assets/arrow_down.png");
const arrowUp = require("../../../../assets/arrow_up.png");
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment/locale/it";

moment.locale("it");
const { width, height } = Dimensions.get("window");

class MapTopBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			mode: "date",
			show: false,
			dateTxt: moment().format("L"),
			timeTxt: moment().format("HH:mm"),
			cityTxt: "Padova",
			datePickerTxt: "Scegli il giorno",
			dateArrow: arrowDown,
			timeArrow: arrowDown,
			cityArrow: arrowDown,
			bounceValue: new Animated.Value(height),
			arrowDate: new Animated.Value(0),
			arrowTime: new Animated.Value(0),
			arrowCity: new Animated.Value(0),
			modalVisible: false
		};

		this.setDate = this.setDate.bind(this);
	}
	// Component State Management
	componentDidMount() {
		this.show("date");
	}

	// Methods
	setDate(event, date) {
		if (date) {
			if (this.state.mode == "date") {
				let dateTxt = moment(date).format("L");
				this.setState({
					dateTxt: dateTxt
				});
			}

			if (this.state.mode == "time") {
				let timeTxt = moment(date).format("HH:mm");
				this.setState({
					timeTxt: timeTxt
				});
			}

			let toDate = moment(date).toDate();
			this.setState({
				date: toDate
			});
		}
	}

	show(mode) {
		this.setState({
			mode,
			datePickerTxt: mode == "date" ? "Scegli il giorno" : "Scegli l'ora",
			modalVisible: false
		});

		setTimeout(() => {
			this.setState({
				modalVisible: true
			});
		}, 1);
	}

	closeModal() {
		console.log("close");
		this.setState({
			modalVisible: false
		});
	}

	// Render
	render() {
		return (
			<View style={styles.wrapper}>
				<View style={styles.container}>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							this.show("date");
						}}
						style={styles.btn}
					>
						<Text style={styles.btnTxt}>{this.state.dateTxt}</Text>
						<Image
							source={this.state.dateArrow}
							resizeMode="contain"
							style={[styles.arrows]}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							this.show("time");
						}}
						style={styles.btn}
					>
						<Text style={styles.btnTxt}>{this.state.timeTxt}</Text>
						<Image
							source={this.state.timeArrow}
							resizeMode="contain"
							style={[styles.arrows]}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						style={[
							styles.btn,
							{
								flex: 1
							}
						]}
					>
						<Text style={styles.btnTxt}>{this.state.cityTxt}</Text>
						<Image
							source={this.state.cityArrow}
							resizeMode="contain"
							style={styles.arrows}
						/>
					</TouchableOpacity>
				</View>
				<View>
					<Modal
						visible={this.state.modalVisible}
						presentationStyle="overFullScreen"
						transparent={true}
						animationType="slide"
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
									right: 0
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
								<DateTimePicker
									value={this.state.date}
									mode={this.state.mode}
									is24Hour={true}
									display="default"
									onChange={(event, date) =>
										this.setDate(event, date)
									}
								/>
							</View>
							<View>
								<UiButton
									title={this.state.datePickerTxt}
									fullWidth="0.8"
									onPress={() => {
										this.closeModal();
									}}
								/>
							</View>
						</View>
					</Modal>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		position: "absolute",
		// zIndex: 1,
		// height: 0,
		flex: 1
	},
	container: {
		// // position: "absolute",
		// // zIndex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		// // paddingTop: 18,
		height: 64,
		width: width
		// // backgroundColor: "blue"
	},
	btn: {
		backgroundColor: "#EDEEF0",
		padding: 12,
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 6,
		justifyContent: "space-between",
		shadowColor: "rgba(0, 0, 0, 0.1)",
		shadowOpacity: 0.6,
		elevation: 4,
		shadowRadius: 8,
		shadowOffset: {
			width: 1,
			height: 6
		}
	},
	btnTxt: {
		fontSize: 14,
		fontWeight: "700",
		color: "#FC2D1C"
	},
	arrows: {
		width: 14,
		height: 10,
		marginLeft: 6
	},
	datetimepicker: {
		zIndex: 2,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		top: "100%",
		backgroundColor: "#f7f7f7",
		flexDirection: "column",
		alignItems: "center"
	},
	datetimepickerObj: {
		paddingTop: 16,
		width: Dimensions.get("window").width
	},
	btnConfirm: {
		backgroundColor: "#ffffff",
		padding: 12,
		borderRadius: 12,
		marginHorizontal: 6,
		width: "80%"
	},
	btnConfirmTxt: {
		fontSize: 14,
		fontWeight: "700",
		color: "#FC2D1C",
		textAlign: "center"
	}
});

export default MapTopBar;
