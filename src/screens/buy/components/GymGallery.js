import React, { Component } from "react";
import { Image, View, FlatList, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-navigation";

const { width, height } = Dimensions.get("window");
const spacer = 16;

export class GymGallery extends Component {
	keyExtractor(item, index) {
		return item.id.toString();
	}

	renderImage({ item, index, separators }) {
		return (
			<View style={[styles.listItem]}>
				<Image
					source={item.img}
					resizeMode="cover"
					style={styles.image}
				/>
			</View>
		);
	}
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					data={this.props.items}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderImage.bind(this)}
					columnWrapperStyle={styles.row}
					numColumns={3}
					ListHeaderComponent={this.props.description}
				/>
			</SafeAreaView>
		);
	}
}

const boxSize = (width * 0.8) / 2.45;
const realBoxSize = boxSize - spacer * 2;
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingVertical: 24
	},
	row: {
		flexGrow: 1,
		justifyContent: "space-between"
	},
	listItem: {
		marginTop: 16
	},
	image: {
		width: realBoxSize,
		borderRadius: 8,
		height: realBoxSize
	}
});
export default GymGallery;
