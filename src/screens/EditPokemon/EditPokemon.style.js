import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.02,
    backgroundColor: '#E6EAFF'
  },
  pickImageModal: {
    backgroundColor: '#fff',
    height: height * 0.45,
    width: '70%',
    flexDirection: 'column',
    borderRadius: 10
  },
  pickTypeModal: {
    backgroundColor: '#fff',
    height: height * 0.45,
    width: '70%',
    flexDirection: 'column',
    borderRadius: 10
  },
  imgWrapper: {
    flexDirection: 'column',
    width: '100%',
    height: height * 0.4
  },
  img: {
    alignSelf: 'stretch',
    flex: 1,
    width: undefined,
    height: undefined
  },
  formInputContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    height: height * 0.25
  },
  pickTypeContainer: {
    height: height * 0.08,
    marginVertical: height * 0.01
  },
  typeList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.02,
    borderRadius: 3,
    marginVertical: 5,
    width: width * 0.22
  },
  pickLocationContainer: {
    height: height * 0.4,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    marginBottom: height * 0.05
  },
  pokemonName: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#262322'
  },
  pokemonCategory: {},
  editButtonContainer: {
    width: '73%'
  }
});
