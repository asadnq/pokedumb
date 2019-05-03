import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Image, Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const LATITUDE_DELTA = 0.01;
const LONGITUED_DELTA = 0.01;

const initialRegion = {
  latitude: -6.301914,
  longitude: 106.734163,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

class PickLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: initialRegion,
      locationPick: false
    };
  }

  _setRegion = region => {
    this.setState(state => ({
      ...state,
      region: {
        ...state.region,
        ...region
      }
    }));
    this.map.animateToRegion(region);
  };

  _getCurrentPosition = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        position => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
            // latitudeDelta: LATITUDE_DELTA,
            // longitudeDelta: LONGITUED_DELTA
          };
          this._setRegion(region);
          console.log(region);

          alert(position.coords.latitude);
        },
        error => {
          alert(error);
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 2000 }
      );
    } catch (err) {
      alert(err);
    }
  };

  _onPressMap = event => {
    const coords = event.nativeEvent.coordinate;
    this.setState(state => ({
      ...state,
      region: {
        ...state.region,
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      locationPick: true
    }));
  };

  _pickLocationHandler = () => {
    this.props.navigation.state.params.setCoordinate(this.state.region)
    this.props.navigation.goBack()
  }

  render() {
    let marker;
    if (this.state.locationPick) {
      marker = <Marker coordinate={this.state.region} />;
    }
    return (
      <View>
        <Text>Map Screen</Text>
        <MapView
          ref={map => (this.map = map)}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          style={{ width: '100%', height: '80%' }}
          initialRegion={initialRegion}
          region={this.state.region}
          onPress={this._onPressMap}
        >
          {marker}
        </MapView>
        <View>
          <Button title="pick location" onPress={this._pickLocationHandler} />
        </View>
      </View>
    );
  }
}

export default connect(null)(PickLocation);
