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
    Platform,
    Animated,
    Easing,
    Dimensions,
}
from 'react-native'
const arrowDown = require('../../assets//arrow_down.png');
const arrowUp = require('../../assets//arrow_up.png');
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import 'moment/locale/it';

moment.locale('it')
let isHidden = true
let panelHeight = Dimensions.get('window').height


class MapTopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            mode: 'date',
            show: false,
            dateTxt: moment().format('L'),
            timeTxt: moment().format('HH:mm'),
            cityTxt: 'Padova',
            dateArrow: arrowDown,
            timeArrow: arrowDown,
            cityArrow: arrowDown,
            bounceValue: new Animated.Value(panelHeight),
            arrowValue: new Animated.Value(0)
        }
    }

    // Component State Management
    componentDidMount() {}

    // Methods
    setDate(event, date) {
        if (date) {
            if (this.state.mode == 'date') {
                let dateTxt = moment(date).format('L')
                this.setState({
                    dateTxt: dateTxt,
                });
            }

            if (this.state.mode == 'time') {
                let timeTxt = moment(date).format('HH:mm')
                this.setState({
                    timeTxt: timeTxt,
                });
            }

            let toDate = moment(date).toDate()
            this.setState({
                date: toDate,
            })
        }
        else {
            this._togglePicker()
            // this.setState({
            //     show: false
            // })
        }

    }

    _togglePicker() {
        return new Promise((resolve, reject) => {
            let toValue = panelHeight;
            let duration = 400
            let timeout = 150
            if (isHidden) {
                toValue = 0;
                duration = 600
                timeout = 10
            }

            Animated.spring(
                this.state.bounceValue, {
                    toValue: toValue,
                    duration: duration,
                    velocity: 3,
                    tension: 2,
                    friction: 6,
                }
            ).start();

            isHidden = !isHidden;
            setTimeout(() => {
                resolve()
            }, timeout)
        });
    }

    show(mode) {
        if (mode == 'date') {
            let toDeg = isHidden ? 1 : 0
            Animated.spring(this.state.arrowValue, {
                toValue: toDeg,
                tension: 150,
                friction: 5,
                useNativeDriver: true,
            }).start()
        }

        if (this.state.mode != mode && isHidden == false) {
            this._togglePicker().then(() => {
                this.setState({
                    show: true,
                    mode,
                });
                this._togglePicker()
            })
        }
        else {
            this.setState({
                show: true,
                mode,
            });
            this._togglePicker()
        }
    }

    hide() {
        // this.setState({
        //     show: false,
        // });
        this._togglePicker()
    }

    // Render
    render() {
        // Dynamic styles
        const compStyles = StyleSheet.create({})
        let animationPanel = {
            transform: [{
                translateY: this.state.bounceValue
            }]
        }
        let animationArrowDate = {
            transform: [{
                rotate: this.state.arrowValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [`0deg`, `180deg`],
                })
            }]
        }
        // Component
        return (
            <View style={styles.wrapper}>
                <View style={[styles.container]}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {this.show('date')}}
                        style={styles.btn}
                    >
                        <Text style={styles.btnTxt}>
                            {this.state.dateTxt}
                        </Text>
                        <Animated.Image
                            source={this.state.dateArrow}
                            resizeMode="contain"
                            style={[styles.arrows, animationArrowDate]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                            onPress={() => {this.show('time')}}
                            style={styles.btn}
                        >
                        <Text style={styles.btnTxt}>
                            {this.state.timeTxt}
                        </Text>
                        <Image
                            source={this.state.timeArrow}
                            resizeMode="contain"
                            style={styles.arrows}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.btn, {
                            flex: 1,
                        }]}
                    >
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
                    { Platform.OS === 'ios' && (
                        <Animated.View
                            style={[styles.datetimepicker, animationPanel]}
                            >
                            <DateTimePicker
                                value={this.state.date}
                                mode={this.state.mode}
                                is24Hour={true}
                                display="default"
                                testID="dateTimePicker"
                                minimumDate={new Date(1950, 0, 1)}
                                onChange={this.setDate.bind(this)}
                                style={styles.datetimepickerObj}
                            />
                            <TouchableOpacity
                                style={styles.btnConfirm}
                                onPress={() => {this.hide()}}
                            >
                                <Text style={styles.btnConfirmTxt}>Conferma</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'stretch',
        zIndex: 1,
        height: Dimensions.get('window').height,
    },
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
        justifyContent: 'space-between',
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
    },
    datetimepicker: {
        zIndex: 2,
        width: Dimensions.get('window').width,
        top: '100%',
        backgroundColor: '#f7f7f7',
        flexDirection: 'column',
        alignItems: 'center',
    },
    datetimepickerObj: {
        paddingTop: 16,
        width: Dimensions.get('window').width,
    },
    btnConfirm: {
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 12,
        marginHorizontal: 6,
        width: '80%',
    },
    btnConfirmTxt: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FC2D1C',
        textAlign: 'center',
    },
})

export default MapTopBar;
