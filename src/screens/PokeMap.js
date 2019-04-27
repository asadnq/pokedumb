import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Image, Text } from 'react-native-elements'
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'


class PokeMap extends React.Component {

    render() {
        return(
            <View>
                <Text>Map Screen</Text>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{width: '100%', height: '80%'}}
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                />
            </View>
        )
    }
}

export default connect(null)(PokeMap);