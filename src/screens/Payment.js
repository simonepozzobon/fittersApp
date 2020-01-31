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
import UiContainer from "../components/UiContainer";
import UiSectionTitle from "../components/UiSectionTitle";
import UiBreadcrumb from "../components/UiBreadcrumb";

const { width, height } = Dimensions.get("window");

export class Payment extends Component {
	_onChange(form) {
		console.log(form);
	}

	render() {
		return (
			<MainTemplate
				onPressTimes={() => {
					this.goTo("userSelection");
				}}
			>
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
							<View></View>
						</ScrollView>
					</SafeAreaView>
				</UiContainer>
			</MainTemplate>
		);
	}
}

const styles = StyleSheet.create({
	container: { width: width * 0.8 },
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

export default Payment;
