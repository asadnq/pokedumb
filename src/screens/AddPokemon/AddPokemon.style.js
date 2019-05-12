import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
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
    flexDirection: 'row',
    width: '100%',
    height: height * 0.4
  },
  img: {
    flex: 1,
    alignSelf: 'stretch',
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
  PickLocationContainer: {
    height: height * 0.4,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    marginBottom: height * 0.05
  }
});
