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

class Login extends Component {
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
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                              autoCorrect={false}
                              value={this.state.email}
                              placeholder="your email"
                              placeholderTextColor="white"
                              returnKeyType="next"
                              keyboardType="email-address"
                              onChangeText={this.emailSet}
                              onSubmitEditing={this.focusToPassword}
                              style={[compStyles.formInput, styles.input, compStyles.formInput]}
                            />
                    </View>
                    <View style={{ marginTop: 20 }}>
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
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity 
                            style={[styles.btnWhite, compStyles.btnWhite]}
                            onPress={() => {this.goTo('home')}}>
                            <Text style={styles.btnWhiteText}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 40}}>
                        <Text style={{ color: 'white' }}>
                            Forgot Password?
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 40}}>
                        <TouchableOpacity 
                            style={[styles.btnWhite]}
                            onPress={() => {this.goTo('register')}}>
                            <Text style={styles.btnWhiteText}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.btnWhite, { marginLeft: 20 }]}
                            onPress={() => {this.goTo('register')}}>
                            <Text style={styles.btnWhiteText}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 40, flexDirection: 'row'}}>
                        <Text style={{ color: 'white' }}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            style={{ paddingLeft:10 }}
                            onPress={() => { this.goTo('register')}}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                Sign Up
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

export default Login;
