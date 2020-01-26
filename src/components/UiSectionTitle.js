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

class UiSectionTitle extends Component {
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
            <Text style={styles.sectionTitle}>
              {this.props.title}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FC2D1C',
    }
})

export default UiSectionTitle;
