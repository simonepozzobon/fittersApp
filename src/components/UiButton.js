import React, {
    Component
}
from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
}
from 'react-native'

class UiButton extends Component {
    constructor() {
        super()
        this.state = {}
    }

    // Component State Management
    componentDidMount() {}

    // Methods
    clicked() {
        this.props.clicked()
    }

    // Render
    render() {
        // Dynamic styles
        let compStylesObj = {
            fullWidth: {}
        }

        if (this.props.fullWidth == true) {
            compStylesObj.fullWidth = {
                width: Dimensions.get('window').width
            }
        }
        else if (typeof this.props.fullWidth == 'string') {
            compStylesObj.fullWidth = {
                width: Dimensions.get('window').width * this.props.fullWidth
            }
        }


        compStyles = StyleSheet.create(compStylesObj)


        // Component
        return (
            <TouchableOpacity
              style={[styles.btnWhite, compStyles.fullWidth]}
              onPress={this.props.onPress}
            >
              <Text style={styles.btnWhiteText}>
                  {this.props.title}
              </Text>
              {this.props.children}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    btnWhite: {
        marginTop: 30,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 12,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.6,
        elevation: 4,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 6
        },
    },
    btnWhiteText: {
        textAlign: 'center',
        color: '#FF2A00',
        fontWeight: '800',
    },
})

export default UiButton;
