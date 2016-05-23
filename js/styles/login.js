'use strict';
/**
 * @class 
 * @desc login
 * */
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';
var cell_w = Dimensions.get('window').width;
var cell_h= Dimensions.get('window').height;
var styles = StyleSheet.create({
    loginWrap: {
      backgroundColor: '#FCE9D4',
    },

    imgWrap: {
      flexDirection: 'row',
      flex: 1,
    },
    loginMain: {
      flex:1,
      position: 'relative',
      alignItems: 'center', 
      justifyContent: 'center',
    },
    loginMainCon: {
      position: 'absolute', 
      top: 110,
      left: (cell_w*0.1)/2,
      backgroundColor: '#fff',
      width: cell_w*0.9,
      // height: 200,
      height: (cell_h-110)*0.6,
      borderRadius: 10,
    },
    comCulture: {
      width:cell_w*0.9,
      marginTop:40,
    },
    logoImg: {
      position: 'absolute', 
      top:0,
      left: cell_w/7,
      width:cell_w/7*5,
      resizeMode: 'contain',
    },
    formStyle: {
      margin: (cell_w*0.05)/2,
      width: cell_w*0.85,
    },
    inputStyle: {
      marginTop: 10,
      backgroundColor:'#F4F3F3',
      height: (cell_h-110)*0.25,
      borderRadius: 8,
    },
    formInput:{
      flexDirection:'row',
      height: (cell_h-110)*0.125,
      padding: 17,
    },
    formInputSplit:{
      borderBottomWidth:1,
      borderBottomColor:'#dbdada',
    },
    loginInput: {
      height: 30,
      borderColor: '#000',
      paddingLeft: 10,
      flex: 1,
      fontSize: 16,
    },
    forget: {
      //alignItems: 'flex-end',
      flexDirection:'row',
      margin: 20,
      
    },
    btn: {
      flexDirection:'row',
      width: cell_w*0.8,
      //backgroundColor:'transparent',
    },

    btnWrap:{
      marginTop: (cell_h-110)*0.15,
      borderRadius: 5,
    },
    loginBtn1: {
        fontSize: 20,
        color: '#ffffff',
        backgroundColor: 'transparent',
        width: cell_w*0.4,
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
        paddingTop: 15,
        marginRight: cell_w*0.1,
        flex: 1,
        textAlign: 'center',
    },
    loginBtn2: {
        fontSize: 20,
        color: '#C7D634',
        backgroundColor: '#fff',
        width: cell_w*0.4,
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
        paddingTop: 15,
        flex: 1,
        textAlign: 'center',
    },
  
      
})


module.exports = styles;
