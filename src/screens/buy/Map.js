import React, { Component } from "react";

import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TextInput,
	TouchableOpacity,
	Image,
	Animated
} from "react-native";

import MainTemplate from "../../presentation/MainTemplate";
import Header from "../../presentation/Header";
import MapTopBar from "../../components/MapTopBar";
import MapPanel from "./components/MapPanel";

const logo = require("../../../assets/brand/logo.png");
const Pin = require("../../../assets/Pin.png");

import MarkerData from "../../dummies/Marker";

import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";

import GestureRecognizer, {
	swipeDirections
} from "react-native-swipe-gestures";

import Geolocation from "@react-native-community/geolocation";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let isHidden = true;

class Home extends Component {
	constructor(props) {
		super(props);
		Geolocation.getCurrentPosition(
			position => this.positionSet(position),
			err => {
				console.error(
					"errore Geolocation",
					"https://github.com/react-native-community/react-native-geolocation#getcurrentposition"
				);
			}
		);
		// this.watchID = Geolocation.watchPosition(
		//     position => this.positionSet(position),
		//     err => {}
		// )

		this.state = {
			region: {
				latitude: 45.465317,
				longitude: 9.189441,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
			},
			cacheRegion: {},
			item: {
				title: null,
				description: null,
				logo: null
			}
		};
		this.current = null;
	}

	init() {}

	// Component State Management
	componentDidMount() {
		setTimeout(() => {
			this._selectMarker(MarkerData[0]);
		}, 1000);
	}

	componentWillUnmount() {
		Geolocation.clearWatch(this.watchID);
	}

	// Methods
	positionSet(position) {
		let lat = position.coords.latitude;
		let lng = position.coords.longitude;

		let region = {
			latitude: lat,
			longitude: lng,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		};

		this.setState({
			region: region
		});
	}

	goTo(route) {
		this.props.navigation.navigate(route);
	}

	onRegionChange(region) {
		this.setState({
			region: region
		});
	}

	_selectMarker(marker) {
		const map = this.mapView;

		let camera = map.getCamera().then(camera => {
			if (marker.latlng.latitude && marker.latlng.longitude) {
				let newCamera = {
					...camera,
					altitude: 500,
					pitch: 20,
					center: {
						latitude: marker.latlng.latitude,
						longitude: marker.latlng.longitude
					}
				};

				map.animateCamera(newCamera, 1000);
				this.setState({
					item: marker
				});
			}

			this.mapPanel._selectMarker(marker);
		});
	}

	// Render
	render() {
		// Dynamic styles

		// Component
		return (
			<MainTemplate fixedView={true} onPressTimes="userSelection">
				<View style={{ flex: 1 }}>
					<MapTopBar />
					<MapView
						ref={mapView => (this.mapView = mapView)}
						style={styles.map}
						initialRegion={this.state.region}
						onRegionChange={this.onRegionChange.bind(this)}
						showsUserLocation={true}
						showsMyLocationButton={true}
						showsScale={true}
					>
						{MarkerData.map(marker => (
							<Marker
								key={marker.id}
								coordinate={marker.latlng}
								title={marker.title}
								description={marker.description}
							>
								<TouchableOpacity
									onPress={() => {
										this._selectMarker(marker);
									}}
								>
									<Image style={styles.pin} source={Pin} />
								</TouchableOpacity>
								<Callout alphaHitTest tooltip />
							</Marker>
						))}
					</MapView>
					<MapPanel
						item={this.state.item}
						navigation={this.props.navigation}
						ref={mapPanel => (this.mapPanel = mapPanel)}
					/>
				</View>
			</MainTemplate>
		);
	}
}

const styles = StyleSheet.create({
	// Forms
	map: {
		width: width,
		height: height,
		flex: 1
	},
	pin: {
		width: 36,
		height: 36
	}
});

export default Home;
