import React, {
    Component
}
from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
}
from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
const arrowDown = require('../../assets//arrow_down.png');
const arrowUp = require('../../assets//arrow_up.png');


class MapTopBar extends Component {
    constructor() {
        super()
        this.state = {
            date: new Date('2020-06-12T14:42:42'),
            mode: 'date',
            show: false,
            dateTxt: '24/01/2020',
            timeTxt: '18:30',
            cityTxt: 'Padova',
            dateArrow: arrowDown,
            timeArrow: arrowDown,
            cityArrow: arrowDown,
        }
    }

    // Component State Management
    componentDidMount() {}

    // Methods
    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }

    datepicker = () => {
        this.show('date');
    }

    timepicker = () => {
        this.show('time');
    }

    // Render
    render() {
        const {
            show,
            date,
            mode
        } = this.state;

        // Dynamic styles
        const compStyles = StyleSheet.create({})

        // Component
        return (
            <View style={[styles.container]}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnTxt}>
                            {this.state.dateTxt}
                        </Text>
                        <Image
                            source={this.state.dateArrow}
                            resizeMode="contain"
                            style={styles.arrows}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnTxt}>
                            {this.state.timeTxt}
                        </Text>
                        <Image
                            source={this.state.timeArrow}
                            resizeMode="contain"
                            style={styles.arrows}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {
                        flex: 1,
                    }]}>
                        <Text style={styles.btnTxt}>
                            {this.state.cityTxt}
                        </Text>
                        <Image
                            source={this.state.cityArrow}
                            resizeMode="contain"
                            style={styles.arrows}
                        />
                    </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignSelf: 'stretch',
        paddingHorizontal: 16,
        paddingTop: 18
    },
    btn: {
        backgroundColor: '#EDEEF0',
        padding: 12,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6,
        justifyContent: 'space-between'
    },
    btnTxt: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FC2D1C',
    },
    arrows: {
        width: 14,
        height: 10,
        marginLeft: 6,
    }
})

export default MapTopBar;
