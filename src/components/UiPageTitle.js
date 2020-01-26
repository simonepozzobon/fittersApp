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

class UiPageTitle extends Component {
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
            <Text style={styles.pageTitle}>
              {this.props.title}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    pageTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FC2D1C',
    }
})

export default UiPageTitle;
