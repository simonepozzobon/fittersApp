import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	ScrollView,
	Alert
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import { setUser, setToken } from "../../../redux/actions/UserActions";

import MainTemplate from "../../../presentation/MainTemplate";
import UiButton from "../../../components/UiButton";
import UiBreadcrumb from "../../../components/UiBreadcrumb";
import UiSectionTitle from "../../../components/UiSectionTitle";
import SubscriptionView from "../components/SubscriptionView";
const { width } = Dimensions.get("window");

export class Subscriptions extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// Alert.alert("ciao");
	}

	goTo = route => {
		this.props.navigation.navigate(route);
	};

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
							<UiSectionTitle title="I tuoi abbonamenti" />
						</View>
						<View style={styles.container}>
							{this.props.user.subscriptions.map((sub, i) => (
								<SubscriptionView
									key={sub.id}
									hasMargin={i > 0 ? true : false}
									name={sub.name}
									address={sub.address}
									type={sub.type}
									number={sub.number}
									deadline={sub.deadline}
								/>
							))}
							<View>
								<UiButton
									title="Aggiungi abbonamento"
									fullWidth="0.8"
									onPress={() => {
										this.goTo("addSubscription");
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

const mapPropsToState = state => {
	return {
		...state.user,
		...state.token
	};
};

export default connect(
	mapPropsToState,
	{ setUser, setToken },
	(stateProps, dispatchProps, ownProps) => {
		return {
			...ownProps,
			...stateProps,
			...dispatchProps
		};
	}
)(Subscriptions);
