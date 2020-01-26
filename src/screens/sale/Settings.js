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
    Animated,
    Picker
}
from 'react-native'

import MainTemplate from '../../presentation/MainTemplate'
import Header from '../../presentation/Header'
import MapTopBar from '../../components/MapTopBar'
import MarkerData from '../../dummies/Marker'
import UiButton from '../../components/UiButton'
import UiContainer from '../../components/UiContainer'
import UiPageTitle from '../../components/UiPageTitle'
import CalendarPicker from 'react-native-calendar-picker';

import moment from 'moment'

const Pin = require('../../../assets/Pin.png');
const arrowUp = require('../../../assets/arrow_up.png');
const arrowDown = require('../../../assets/arrow_down.png');
const logo = require('../../../assets/brand/logo.png');

const {
    width,
    height
} = Dimensions.get('window');

let isHidden = true;

const DummySubs = [{
        id: 1,
        label: 'Abbonamento Virgin',
        value: 'AX 567',
    },
    {
        id: 2,
        label: 'Abbonamento GetFit',
        value: 'AX 234',
    },
    {
        id: 3,
        label: 'Abbonamento Pure Fitness',
        value: 'AX 438',
    },
]

class CediIngresso extends Component {
    constructor() {
        super()
        this.state = {
            selectedStartDate: null,
            subscriptionTxt: 'Seleziona Abbonamento',
            subscription: null,
            selectedDates: null,
            bounceValue: new Animated.Value(height)
        }
    }

    // Component State Management

    componentDidMount() {
        this.setState({
            screenWidth: width,
        })
    }

    // Methods

    goTo(route) {
        this.props.navigation.navigate(route)
    }

    onDateChange(date) {
        let hDate = moment(date).format('d MMMM YYYY')
        this.setState({
            selectedStartDate: date,
            selectedDates: hDate,
        });
    }


    _toggleSubView() {
        let toValue = height
        if (!isHidden) {
            toValue = 0
        }
        console.log(toValue);

        Animated.spring(
            this.state.bounceValue, {
                toValue: toValue,
                duration: 600,
                velocity: 3,
                tension: 2,
                friction: 6,
                useNativeDriver: true,
            }
        ).start()

        isHidden = !isHidden;
    }

    setSubscription(itemValue, itemIndex) {
        console.log(itemValue);
        this.setState({
            subscription: itemValue,
            subscriptionTxt: DummySubs.find(sub => sub.value == itemValue).label
        })
    }

    // Render
    render() {
        // Dynamic styles
        const {
            selectedStartDate
        } = this.state
        const startDate = selectedStartDate ? selectedStartDate.toString() : ''

        let animationPanel = {
            transform: [{
                translateY: this.state.bounceValue
            }]
        }

        // Component
        return (
            <MainTemplate>
                <Header
                  onPressTimes={() => {this.goTo('userSelection')}}
                />
                <UiContainer>
                  <View style={styles.container}>
                    <UiPageTitle title="Cedi Ingresso" />
                  </View>
                  <View style={{marginTop: 24}}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this._toggleSubView.bind(this)}
                        style={styles.selector}
                    >
                        <Text style={styles.selectorText}>
                            {this.state.subscriptionTxt}
                        </Text>
                        <Image
                          source={arrowDown}
                          resizeMode="contain"
                          style={{
                            width: 15,
                            height: 15
                          }}
                        />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.calendar, {marginTop: 24}]}>
                    <CalendarPicker
                      onDateChange={this.onDateChange.bind(this)}
                      selectedDayStyle={styles.selectedDayStyle}
                      selectedDayTextColor="white"
                      width={width * 0.8}
                      previousTitle="<"
                      nextTitle=">"
                      textStyle={styles.textStyle}
                      dayLabelsWrapper={styles.dayLabelsWrapper}
                      dayOfWeekStyles={styles.dayOfWeekStyles}
                    />
                  </View>
                  <View style={{marginTop: 24}}>
                    <Text style={styles.label}>Stai cedendo:</Text>
                    <Text style={styles.value}>{this.state.subscription}</Text>
                  </View>
                  <View style={{marginTop: 24}}>
                    <Text style={styles.label}>Per i giorni:</Text>
                    <Text style={styles.value}>{this.state.selectedDates}</Text>
                  </View>
                  <UiButton
                    title="Cedi Ingresso"
                    fullWidth="0.7"
                    onPress={() => {this.goTo('saleCompleted')}}
                  />
                  <Animated.View
                    style={[styles.subView, animationPanel]}
                  >
                    <Picker
                      selectedValue={this.state.subscription}
                      style={styles.subscriptionSelect}
                      onValueChange={this.setSubscription.bind(this)}>
                      {
                        DummySubs.map(item => (
                          <Picker.Item
                              key={item.id}
                              label={item.label}
                              value={item.value}
                          />
                        ))
                      }
                    </Picker>
                    <View style={styles.subscriptionSelectBtn}>
                      <UiButton
                        title="Conferma"
                        fullWidth="0.8"
                        onPress={this._toggleSubView.bind(this)}
                      />
                    </View>
                  </Animated.View>
                </UiContainer>
            </MainTemplate>
        );
    }
}

const styles = StyleSheet.create({
    // Forms
    container: {
        width: width * 0.8,
    },
    label: {
        textAlign: 'center',
    },
    value: {
        fontWeight: '700',
        textAlign: 'center',
    },
    selectedDayStyle: {
        backgroundColor: '#FC2D1C',
    },
    dayLabelsWrapper: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    dayOfWeekStyles: {
        fontSize: 10,
    },
    textStyle: {
        fontSize: 14
    },
    selector: {
        width: width * 0.7,
        borderWidth: 0.5,
        borderColor: '#252525',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectorText: {
        color: '#FC2D1C',
        fontSize: 12,
        fontWeight: '700',
    },
    subscriptionSelect: {
        width: width,
    },
    subscriptionSelectBtn: {
        marginBottom: 32
    },
    subView: {
        zIndex: 2,
        position: 'absolute',
        width: width,
        backgroundColor: '#f7f7f7',
        flexDirection: 'column',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
    },
})

export default CediIngresso;
