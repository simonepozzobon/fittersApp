import React, {
    Component
}
from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
}
from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {
    KeyboardAwareScrollView
}
from 'react-native-keyboard-aware-scroll-view'

class MainTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // Component State Management

    componentDidMount() {}

    // Methods

    // Render
    render() {
        // Dynamic styles
        const compStyles = StyleSheet.create({})

        // Component
        return (
            <LinearGradient
                colors={['#ff5900', '#ff2a00']}
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.5, y: 1.0 }}
                style={styles.backgroundGradient}>
                    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                        <ScrollView contentContainerStyle={styles.scroll}>
                            <View style={styles.content} >
                                {this.props.children}
                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>
        </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    backgroundGradient: {
        flex: 12,
    },
    scroll: {
        flex: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 12,
    },
})

export default MainTemplate;
