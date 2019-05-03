import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Text, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { POKEMON_IMG_PATH } from '../config/url.config';
import ListType from '../components/ListType';

const { width, height } = Dimensions.get('window');

const ListPokemon = props => {
  return (
    <TouchableOpacity onPress={props.onListPress}>
      <View
        style={styles.listContainer}
      >
        <Image source={{ uri: POKEMON_IMG_PATH + props.image_url}} containerStyle={styles.imgWrapper} style={styles.img} resizeMode='contain'/>
        <View style={styles.listText}>
          <View style={styles.listTitle}>
            <Text h4>{props.name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', width: '35%'}}>
            <Text style={{color: '#222'}}>category:</Text>
              <Text>{props.category.name}</Text>
            </View>   
            <View style={{flexDirection: 'column', width: '50%'}}>
              <Text style={{color: '#222'}}>type: </Text>
              <FlatList 
                data={props.type}
                keyExtractor={item => item.id + ' key'}
                horizontal={true}
                renderItem={({item}) => <ListType type={item.name} text={item.name} />}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListPokemon;

const styles = StyleSheet.create({
    imgWrapper: {
        flexDirection: 'row',
        width: '30%',
        height: '100%'
      },
      img: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined
      },
      listContainer: {
          flex: 1,
          flexDirection: 'row',
          marginVertical: 5,
          marginHorizontal: width * 0.03,
          height: height * .17,
          borderRadius: 5,
          borderWidth: .8
      },
      listText: {
        flexDirection: 'column',
        paddingVertical: 15,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        backgroundColor: '#EFFDEF',
        width: '69%'
      },
      listTitle: {
        borderBottomWidth: .88,
        borderColor: 'rgba(180, 180,180 ,.8)'
      }
})