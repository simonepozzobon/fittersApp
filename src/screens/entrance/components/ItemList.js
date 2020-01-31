import React, { Component } from "react";
import { FlatList, View, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export class ItemList extends Component {
	constructor(props) {
		super(props);
	}

	keyExtractor(item, index) {
		return item.id.toString();
	}

	renderHeader() {
		return (
			<View style={styles.listItem}>
				<View style={styles.col1}></View>
				<View style={styles.col2}>
					<Text style={styles.headLabel}>Nome palestra</Text>
				</View>
				<View style={styles.col3}>
					<Text style={styles.headLabel}>Data</Text>
				</View>
				<View style={styles.col4}>
					<Text style={styles.headLabel}>Prezzo</Text>
				</View>
			</View>
		);
	}

	renderEntrance({ item, index, separators }) {
		let id = index + 1;
		return (
			<View style={styles.listItem}>
				<View style={styles.col1}>
					<Text style={styles.id}>{id}</Text>
				</View>
				<View style={[styles.gym, styles.col2]}>
					<Text>{item.gym}</Text>
				</View>
				<View style={styles.col3}>
					<Text style={styles.date}>{item.date}</Text>
					<Text style={styles.date}>{item.time}</Text>
				</View>
				<View style={styles.col4}>
					<Text>€ {item.price}</Text>
				</View>
			</View>
		);
	}

	render() {
		return (
			<FlatList
				data={this.props.items}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderEntrance}
				ListHeaderComponent={this.renderHeader}
			/>
		);
	}
}
const styles = StyleSheet.create({
	listItem: {
		flexDirection: "row",
		width: width * 0.8,
		justifyContent: "space-between",
		marginTop: 14
	},
	gym: {
		height: 48,
		width: width * 0.25,
		borderColor: "#252525",
		borderWidth: 0.5,
		borderRadius: 12,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	},
	id: {
		fontSize: 12,
		fontWeight: "300"
	},
	date: {
		fontSize: 12,
		fontWeight: "300"
	},
	col1: {
		flexBasis: "5%",
		justifyContent: "center"
	},
	col2: {
		flexBasis: "42%",
		alignItems: "center",
		justifyContent: "center"
	},
	col3: {
		flexBasis: "30%",
		alignItems: "center",
		justifyContent: "center"
	},
	col4: {
		flexBasis: "20%",
		alignItems: "center",
		justifyContent: "center"
	},
	headLabel: {
		fontSize: 11,
		fontWeight: "300"
	}
});
export default ItemList;
