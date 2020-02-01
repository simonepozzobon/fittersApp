import React, { Component } from "react";
import {
	Animated,
	Dimensions,
	Image,
	StyleSheet,
	Easing,
	Text,
	View,
	SafeAreaView
} from "react-native";

import GestureRecognizer from "react-native-swipe-gestures";
import Collapsible from "react-native-collapsible";

import UiButton from "../../../components/UiButton";
import GymGallery from "./GymGallery";
import { ScrollView } from "react-native-gesture-handler";

import MarkerData from "../../../dummies/Marker";

const rating = require("../../../../assets/rating.png");
const ArrowDown = require("../../../../assets/arrow_down.png");
const ArrowUp = require("../../../../assets/arrow_up.png");
const { width, height } = Dimensions.get("window");

class MapPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bounceValue: new Animated.Value(height),
			heightValue: new Animated.Value(),
			isOpen: true,
			item: null,
			description: null,
			logo: null,
			descriptionIsOpen: false,
			arrowIcon: ArrowUp
		};

		this._toggleSubView = this._toggleSubView.bind(this);
	}

	componentDidMount() {
		// setTimeout(() => {
		// 	this.openMarker(MarkerData[0]);
		// 	setTimeout(() => {
		// 		this.onSwipeUp();
		// 	}, 200);
		// }, 1000);
	}

	goTo(route) {
		this.props.navigation.navigate(route);
	}

	// Methods
	openMarker(marker) {
		// console.log("openMArker", this.state.isOpen, this.state.item, marker);

		return new Promise((resolve, reject) => {
			if (this.state.isOpen == true && this.state.item == null) {
				this.setState({
					item: marker
				});
				this._toggleSubView().then(() => {
					resolve(marker);
				});
			} else if (this.state.item && this.state.item.id == marker.id) {
				this._toggleSubView().then(() => {
					this.setState({
						item: null
					});

					resolve(marker);
				});
			} else if (this.state.item && this.state.item.id != marker.id) {
				this._toggleSubView().then(() => {
					this.setState({
						item: marker
					});

					if (this.state.isOpen == true) {
						this._toggleSubView().then(() => {
							resolve(marker);
						});
					} else {
						resolve(marker);
					}
				});
			}
		});
	}

	_toggleSubView() {
		return new Promise((resolve, reject) => {
			let toValue = this.state.isOpen == false ? height : 0;
			let easing = Easing.inOut(Easing.back(1));

			Animated.timing(this.state.bounceValue, {
				toValue: toValue,
				duration: this.state.isOpen == false ? 500 : 300,
				easing,
				useNativeDriver: true
			}).start(() => {
				this.setState({
					isOpen: !this.state.isOpen
				});
				resolve();
			});
		});
	}

	onSwipeUp() {
		if (this.state.descriptionIsOpen == false) {
			this.setState({
				isCollapsed: false,
				descriptionIsOpen: true,
				arrowIcon: ArrowDown
			});
		}
	}

	onSwipeDown() {
		if (this.state.descriptionIsOpen) {
			this.setState({
				isCollapsed: true,
				descriptionIsOpen: false,
				arrowIcon: ArrowUp
			});
		} else {
			this.openMarker(this.state.item);
		}
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

		let animateDescription = {
			height: this.state.heightValue.interpolate({
				inputRange: [0, 1],
				outputRange: [0, height]
			})
		};

		const config = {
			velocityThreshold: 0.3,
			directionalOffsetThreshold: 50
		};

		let GalleryImages = this.state.item ? this.state.item.images : [];

		// Component
		return (
			<Animated.View style={[styles.subView, animationPanel]}>
				<GestureRecognizer
					config={config}
					onSwipeUp={this.onSwipeUp.bind(this)}
					onSwipeDown={this.onSwipeDown.bind(this)}
					style={styles.gestureContainer}
				>
					<Image
						source={this.state.arrowIcon}
						resizeMode="stretch"
						style={{
							marginTop: 4,
							width: 24,
							height: 8,
							opacity: 0.3
						}}
					/>
				</GestureRecognizer>
				<View style={styles.panelTop}>
					<View style={styles.panelLeft}>
						<Image
							source={
								this.state.item ? this.state.item.logo : null
							}
							resizeMode="contain"
							style={styles.panelImage}
						/>
					</View>
					<View style={styles.panelRight}>
						<View style={styles.panelNamePrice}>
							<View>
								<Text style={styles.panelLabel}>Palestra</Text>
								<Text style={styles.panelData}>
									{this.state.item
										? this.state.item.title
										: null}
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "flex-start",
									justifyContent: "flex-end"
								}}
							>
								<Text style={styles.panelPrice}>€ 5</Text>
								<Text style={styles.panelPriceDecimal}>
									,00
								</Text>
							</View>
						</View>
						<View
							style={[
								{
									marginTop: 20
								}
							]}
						>
							<Text style={styles.panelLabel}>
								Indirizzo palestra
							</Text>
							<Text style={styles.panelData}>
								{this.state.item
									? this.state.item.address
									: null}
							</Text>
						</View>
						<View style={styles.panelInfo}>
							<Image
								source={rating}
								resizeMode="contain"
								style={styles.panelRating}
							/>
						</View>
					</View>
				</View>
				<SafeAreaView style={[styles.galleryContainer]}>
					<Collapsible
						collapsed={this.state.isCollapsed}
						style={{ height: height * 0.3 }}
						duration={this.state.isCollapsed ? 300 : 500}
					>
						<ScrollView>
							<Text>
								{this.state.item
									? this.state.item.description
									: null}
							</Text>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									justifyContent: "space-between"
								}}
							>
								{GalleryImages.map(image => (
									<View
										key={image.id}
										style={[styles.listItem]}
									>
										<Image
											source={image.img}
											resizeMode="cover"
											style={{
												marginTop: 24,
												width: 96,
												height: 96,
												borderRadius: 6
											}}
										/>
									</View>
								))}
							</View>
						</ScrollView>
					</Collapsible>
				</SafeAreaView>
				<View style={styles.panelConfirmContainer}>
					<UiButton
						title="Conferma"
						fullWidth="0.8"
						onPress={() => {
							this.goTo("buyCheckout");
						}}
					/>
				</View>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	subView: {
		zIndex: 2,
		position: "absolute",
		width: width,
		backgroundColor: "#f7f7f7",
		flexDirection: "column",
		alignItems: "center",
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 36,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12
		// paddingTop: 32

		// height: Dimensions.get('window').height * 0.3,
		// flex: 1,
		// paddingTop: 24,
		// alignItems: 'center',
	},
	gestureContainer: {
		flex: 1,
		width: width,
		height: 32,
		top: 0,
		position: "relative",
		zIndex: 3,
		justifyContent: "center",
		alignItems: "center"
		// backgroundColor: "blue"
	},

	panelLeft: {
		width: width * 0.3
	},
	panelRight: {
		flexGrow: 1,
		marginLeft: 24
	},
	panelImage: {
		width: width * 0.3,
		height: width * 0.3,
		borderRadius: 12
	},
	panelTop: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	panelNamePrice: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
		flexGrow: 1
	},
	panelInfo: {
		marginTop: 12
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
	},
	panelLabel: {
		fontSize: 9,
		fontWeight: "300"
	},
	panelData: {
		fontSize: 14
	},
	panelRating: {
		height: 18,
		width: 95
	},
	panelConfirmContainer: {
		marginBottom: 18
	},
	description: {},
	gallery: {},
	galleryContainer: {
		flexGrow: 1,
		alignItems: "center",
		marginTop: 32
	}
});

export default MapPanel;
