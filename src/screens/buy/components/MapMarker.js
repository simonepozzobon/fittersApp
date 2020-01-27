import React, {
    Component
}
from 'react'
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    TouchableOpacity,
    Image,
}
from 'react-native'
import MapPanel from './MapPanel'

const Pin = require('../../../../assets/Pin.png');

import {
    Marker,
    Callout,
}
from 'react-native-maps'

const {
    width,
    height
} = Dimensions.get('window')

class MapMarker extends Component {
    constructor() {
        super()
        this.state = {}
    }

    // Component State Management
    componentDidMount() {}

    // Methods
    _selectMarker() {
        const marker = this.props.marker
        const map = this.props.mapView
        let camera = map.getCamera().then(camera => {
            if (marker.latlng.latitude && marker.latlng.longitude) {
                let newCamera = {
                    ...camera,
                    center: {
                        latitude: marker.latlng.latitude,
                        longitude: marker.latlng.longitude,
                    },
                    pitch: 10,
                    heading: -0.5,
                    altitude: 500
                }

                map.animateCamera(newCamera, 1500)
            }

            // this.mapPanel._selectMarker(marker)
        })
    }

    // Render
    render() {
        // Dynamic styles
        const compStyles = StyleSheet.create({})

        // Component
        return (
            <View>
              <Marker
                  coordinate={this.props.marker.latlng}
                  title={this.props.marker.title}
                  description={this.props.marker.description}
              >
                  <TouchableOpacity
                    onPress={() => this._selectMarker()}
                    >
                      <Image
                          style={styles.pin}
                          source={Pin}
                      />
                  </TouchableOpacity>
                  <Callout
                      alphaHitTest
                      tooltip
                  />
              </Marker>
              <MapPanel
                  ref={mapPanel => this.mapPanel = mapPanel}
                  item={this.props.marker}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pin: {
        width: 36,
        height: 36,
    },
})

export default MapMarker;
