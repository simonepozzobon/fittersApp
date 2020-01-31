import React, { Component } from "react";

export class UiInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null
		};
	}

	setValue(value) {
		this.setState({ value });
	}

	render() {
		return (
			<TextInput
				autoCorrect={false}
				value={this.state.value}
				placeholder="Surname"
				placeholderTextColor="white"
				returnKeyType="next"
				onChangeText={this.setValue}
				style={[
					compStyles.formInput,
					styles.input,
					compStyles.formInput
				]}
			/>
		);
	}
}

export default UiInput;
