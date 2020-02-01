import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	ScrollView
} from "react-native";
import MainTemplate from "../../presentation/MainTemplate";
import UiButton from "../../components/UiButton";
import UiContainer from "../../components/UiContainer";
import UiBreadcrumb from "../../components/UiBreadcrumb";
import UiSectionTitle from "../../components/UiSectionTitle";
import SubscriptionView from "./components/SubscriptionView";
const { width } = Dimensions.get("window");

export class Subscriptions extends Component {
	render() {
		return (
			<MainTemplate fixedView={true} onPressTimes="userSelection">
				<UiContainer>
					<View style={[styles.container, { paddingBottom: 24 }]}>
						<UiBreadcrumb title="Indietro" onPress="back" />
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
								<UiSectionTitle title="I tuoi abbonamenti" />
							</View>
							<View style={styles.container}>
								<SubscriptionView />
								<View>
									<UiButton
										title="Aggiungi abbonamento"
										fullWidth="0.8"
										onPress={() => {}}
									/>
								</View>
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
	}
});

export default Subscriptions;
