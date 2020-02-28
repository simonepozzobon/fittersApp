import React, { Component, useState } from "react";
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native";

export default function DateModal() {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<Modal
			visible={modalVisible}
			presentationStyle="formSheet"
			animationType="slide"
		>
			<View>
				<Text>Ciao</Text>
			</View>
		</Modal>
	);
}
