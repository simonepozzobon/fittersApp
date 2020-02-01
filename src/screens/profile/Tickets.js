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
import ItemList from "./components/ItemList";

const { width, height } = Dimensions.get("window");
import Entrances from "../../dummies/Entrances";

export class EntranceList extends Component {
	goTo(route) {
		this.props.navigation.navigate(route);
	}

	goBack() {
		this.props.navigation.goBack();
	}

	render() {
		console.log(this.props.navigation);
		return (
			<MainTemplate fixedView={true} onPressTimes="userSelection">
				<UiContainer>
					<View style={[styles.container, { paddingBottom: 24 }]}>
						<UiBreadcrumb title="Indietro" onPress="back" />
					</View>

					<View style={[styles.container, { marginBottom: 32 }]}>
						<UiSectionTitle title="I tuoi ingressi" />
					</View>
					<ItemList items={Entrances} />
					<View>
						<UiButton
							title="Compra ingresso"
							fullWidth="0.8"
							onPress={() => {
								this.goTo("buyMap");
							}}
						/>
					</View>
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

export default EntranceList;
