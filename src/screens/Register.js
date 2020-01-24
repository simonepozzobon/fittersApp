import React, {
    Component
}
from 'react'

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Image,
}
from 'react-native'
import MainTemplate from '../presentation/MainTemplate'

const logo = require('../../assets/brand/logo.png');

class Register extends Component {
    constructor() {
        super()
        this.state = {
            screenWidth: 0,
            email: '',
            password: '',
        }
    }

    // Component State Management

    componentDidMount() {
        this.setState({
            screenWidth: Dimensions.get('window').width
        })
    }

    // Methods
    goTo(route) {
        this.props.navigation.navigate(route)
    }

    // Render
    render() {
        // Dynamic styles
        const lg = Math.floor(this.state.screenWidth / 1.5)
        const compStyles = StyleSheet.create({
            formInput: {
                width: lg,
            },
            btnWhite: {
                width: lg,
            }
        })


        // Component
        return (
            <MainTemplate>
            <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
                <View style={{ marginTop: 12 }}>
                    <TextInput
                          autoCorrect={false}
                          value={this.state.email}
                          placeholder="Name"
                          placeholderTextColor="white"
                          returnKeyType="next"
                          keyboardType="email-address"
                          onChangeText={this.emailSet}
                          onSubmitEditing={this.focusToPassword}
                          style={[compStyles.formInput, styles.input, compStyles.formInput]}
                        />
                </View>
                <View style={{ marginTop: 12 }}>
                    <TextInput
                          autoCorrect={false}
                          value={this.state.email}
                          placeholder="Surname"
                          placeholderTextColor="white"
                          returnKeyType="next"
                          keyboardType="email-address"
                          onChangeText={this.emailSet}
                          onSubmitEditing={this.focusToPassword}
                          style={[compStyles.formInput, styles.input, compStyles.formInput]}
                        />
                </View>
                <View style={{ marginTop: 12 }}>
                    <TextInput
                          autoCorrect={false}
                          value={this.state.email}
                          placeholder="Age"
                          placeholderTextColor="white"
                          returnKeyType="next"
                          keyboardType="email-address"
                          onChangeText={this.emailSet}
                          onSubmitEditing={this.focusToPassword}
                          style={[compStyles.formInput, styles.input, compStyles.formInput]}
                        />
                </View>
                <View style={{ marginTop: 12 }}>
                    <TextInput
                          autoCorrect={false}
                          value={this.state.email}
                          placeholder="Indirizzo"
                          placeholderTextColor="white"
                          returnKeyType="next"
                          keyboardType="email-address"
                          onChangeText={this.emailSet}
                          onSubmitEditing={this.focusToPassword}
                          style={[compStyles.formInput, styles.input, compStyles.formInput]}
                        />
                </View>
                <View style={{ marginTop: 12 }}>
                    <TextInput
                          autoCorrect={false}
                          value={this.state.email}
                          placeholder="Città"
                          placeholderTextColor="white"
                          returnKeyType="next"
                          keyboardType="email-address"
                          onChangeText={this.emailSet}
                          onSubmitEditing={this.focusToPassword}
                          style={[compStyles.formInput, styles.input, compStyles.formInput]}
                        />
                </View>
                <View style={{ marginTop: 40 }}>
                    <TextInput
                          autoCorrect={false}
                          value={this.state.email}
                          placeholder="email"
                          placeholderTextColor="white"
                          returnKeyType="next"
                          keyboardType="email-address"
                          onChangeText={this.emailSet}
                          onSubmitEditing={this.focusToPassword}
                          style={[compStyles.formInput, styles.input, compStyles.formInput]}
                        />
                </View>
                <View style={{ marginTop: 12 }}>
                    <TextInput
                          autoCorrect={false}
                          value={this.state.email}
                          placeholder="password"
                          placeholderTextColor="white"
                          returnKeyType="next"
                          keyboardType="email-address"
                          onChangeText={this.emailSet}
                          onSubmitEditing={this.focusToPassword}
                          style={[compStyles.formInput, styles.input, compStyles.formInput]}
                        />
                </View>
                <View style={{ marginTop: 12 }}>
                    <TouchableOpacity 
                        style={[styles.btnWhite, compStyles.btnWhite]}
                        onPress={() => {this.goTo('register')}}>
                        <Text style={styles.btnWhiteText}>
                            Create Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
          </MainTemplate>
        );
    }
}

const styles = StyleSheet.create({
    // Forms
    formInput: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 44,
        borderRadius: 12,
        borderColor: 'white',
        borderWidth: 2,
        paddingHorizontal: 10,
        width: '70%',
        color: 'white'
    },
    btnWhite: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 12,
    },
    btnWhiteText: {
        textAlign: 'center',
        color: '#ff5900',
    },
    logo: {
        width: Dimensions.get('window').width / 4,
    }
})

export default Register;
