import React from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Image, Text } from 'react-native-elements';

import { POKEMON_IMG_PATH } from '../../config/url.config';
import ListType from '../ListType';

const { width, height } = Dimensions.get('window');
const renderPokemonTypes = types => {
  let pokemon_types = [];

  types.map(type => {
    pokemon_types.push(
      <ListType key={type.id} type={type.name} text={type.name} />
    );
  });
  return pokemon_types;
};

const PokemonCard = props => {
  return (
    <TouchableOpacity
      onPress={props.onCardPress}
      style={{
        width: width * 0.47,
        height: height * 0.45,
        marginLeft: width * 0.02,
        marginVertical: height * 0.005,
        borderColor: '#333',
        borderWidth: 0.8,
        borderRadius: 3,
      }}
    >
      <Image
        style={styles.imageStyle}
        containerStyle={styles.imageContainer}
        source={{ uri: POKEMON_IMG_PATH + props.image_url }}
        resizeMode="contain"
      />
      <View style={{ height: '35%', padding: 5 }}>
        <Text h4>{props.name}</Text>
        <Text h5>{props.category.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text>types : </Text>
          <View style={{ flexDirection: 'row' }}>
            {renderPokemonTypes(props.types)}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    height: '65%'
  },
  imageStyle: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }
});

export default PokemonCard;
