import React, {
    Component
}
from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
}
from 'react-native'
const leftArrow = require('../../assets/left_arrow.png')

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
            compStylesObj.fullWidth = {}
        }
        else if (typeof this.props.fullWidth == 'string') {
            compStylesObj.fullWidth = {}
        }


        compStyles = StyleSheet.create(compStylesObj)


        // Component
        return (
            <TouchableOpacity
              style={[styles.btnWhite, compStyles.fullWidth]}
              onPress={this.props.onPress}
            >
              <Image
                source={leftArrow}
                style={styles.arrow}
                resizeMode="contain"
              />
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnWhiteText: {
        fontWeight: '600',
        marginLeft: 8,
    },
    arrow: {
        width: 8,
        height: 14
    }
})

export default UiButton;
