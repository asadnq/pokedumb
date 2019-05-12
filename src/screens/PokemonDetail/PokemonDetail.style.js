import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  imgWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: height * .3
  },
  img: {
    alignSelf: 'stretch',
    flex: 1,
    width: undefined,
    height: undefined
  },
  pokemonName: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#262322'
  },
  pokemonCategory: {},
  mapContainer: {
    width: width,
    height: height * .4
  },
  map: {
    width: '100%',
    height: '100%'
  },
  editButton: {
    backgroundColor: 'transparent'
  },
  deleteButton: {
    backgroundColor: 'rgba(0,0,0,0)'
  }
});