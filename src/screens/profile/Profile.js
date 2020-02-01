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
import DataGroup from "./components/DataGroup";

const { width } = Dimensions.get("window");

import ProfileData from "../../dummies/ProfileData";
const proData = ProfileData[0];

console.log(proData);

export class Profile extends Component {
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
								<UiSectionTitle title="Profilo" />
							</View>
							<View style={styles.container}>
								<View>
									<Text>{proData.name}</Text>
									<Text>{proData.surname}</Text>
								</View>
								<DataGroup
									label="indirizzo"
									value={proData.address}
								/>
								<DataGroup
									label="codice postale"
									value={proData.postal_code}
								/>
								<DataGroup label="città" value={proData.city} />
								<DataGroup
									label="paese"
									value={proData.country}
								/>
								<DataGroup
									label="data di nascita"
									value={proData.birth}
								/>
								<DataGroup
									label="telefono"
									value={proData.phone}
								/>
								<DataGroup label="email" value={proData.mail} />
								<View>
									<UiButton
										title="Modifica profilo"
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

export default Profile;
