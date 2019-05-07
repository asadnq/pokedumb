import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const theme = {
  Image: {
    imageContainer: {
      containerStyle: {
        flexDirection: 'row',
        height: '100%'
      },
      style: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined
      }
    }
  },
  form: {
    Button: {
      buttonStyle: {
        backgroundColor: '#58B09C'
      },
      titleStyle: {
        color: '#EDFAF7'
      }
    },
    Input: {
      containerStyle: {
        flexDirection: 'column',
        height: height * 0.06
      },
      inputStyle: {
        borderWidth: 0,
        borderRadius: 5,
        color: '#8FCCBE'
      },
      inputContainerStyle: {
        borderBottomColor: 'transparent',
        backgroundColor: '#EEE',
        borderRadius: 4,
        paddingHorizontal: 10
      },
      labelStyle: {
        color: '#58B09C',
        marginBottom: 10,
        marginLeft: '1%'
      }
    }
  },
  login: {
    Input: {
      containerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: height * 0.15
      },
      inputContainerStyle: {
        borderBottomColor: 'rgba(0,0,0,0)'
      },
      inputStyle: {
        marginVertical: '2%',
        borderColor: 'rgba(255,255,255, .76)',
        borderWidth: 2,
        borderRadius: 30,
        backgroundColor: '#fff',
        elevation: 3,
        paddingLeft: '10%'
      },
      labelStyle: {
        paddingLeft: '5%'
      }
    }
  }
};

export default theme;
/*
Polished pine : #58B09C
Spanish virdian : #09814A
Pale Lavender : #D4DCFF
Smoky Black : #0F1108
Dark Puce : #433A3F
*/
