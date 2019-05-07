import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Text } from 'react-native-elements'

const Header = props => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    )
}

export default Header

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
        width: width,
        backgroundColor: '#58B09C',
        height: height * .075,
        paddingHorizontal: width * .025,
        paddingVertical: height * .001
    },
    title: {
        fontWeight: 'bold',
        color: '#222',
        fontSize: 18
    }
})