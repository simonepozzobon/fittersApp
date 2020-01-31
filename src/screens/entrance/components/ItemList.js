import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";

export class ItemList extends Component {
	constructor(props) {
		super(props);
	}

	keyExtractor(item, index) {
		return item.id.toString();
	}

	renderEntrance(data, index) {
		return (
			<View>
				<Text>{data.gym}</Text>
			</View>
		);
	}

	render() {
		return (
			<FlatList
				data={this.props.items}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderEntrance}
			/>
		);
	}
}

export default ItemList;
