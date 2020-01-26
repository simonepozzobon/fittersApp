import React, {
    Component
}
from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
}
from 'react-native'

class UiContainer extends Component {
    constructor() {
        super()
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
            <View style={styles.container}>
              {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEDF0',
        width: Dimensions.get('window').width,
        padding: 32,
        alignItems: 'center',
    }
})

export default UiContainer;
