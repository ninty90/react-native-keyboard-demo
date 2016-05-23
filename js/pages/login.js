'use strict';
import React, {
  Component,
  Text,
  View,
  Platform,
  TextInput,
  Image,
  AlertIOS,
  DeviceEventEmitter,
  Dimensions,
  Animated,
} from 'react-native';

var {height, width} = Dimensions.get('window');
var win_h = height,
    win_w = width;

import {connect} from 'react-redux';

import ModalBox from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';

import {logIn, skipLogin} from '../actions/user';

import commonStyle from '../styles/common';
import loginStyle from '../styles/login';


class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: 'sup1',
            password: '123456',
            btnFlag: true,
            keyboardOffset: 0,
        };
    }

    componentDidMount(){
        DeviceEventEmitter.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
        DeviceEventEmitter.addListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
    }

    _keyboardWillShow(e) {
        let keyboard_h = e.endCoordinates.height,
            content_h = win_h - keyboard_h;
        let focus_dom = null;

        if(this.refs.login_name.isFocused()){
            focus_dom = this.refs.login_name;
        }
        if(this.refs.login_psw.isFocused()){
            focus_dom = this.refs.login_psw;
        }

        if(!focus_dom) return ;
        focus_dom.measure((ox, oy, width, height, px, py)=>{
            let text_bottom = py + height + oy;
            console.log('origin x:', ox, ' origin y:', oy, ' width:', width, ' height:', height,' pagex:', px,' pagey:', py, ' text_bottom:', text_bottom);
            if(text_bottom > content_h){
                console.log('need change view marginTop, bottom ', text_bottom);
                this.setState({
                    keyboardOffset: new Animated.Value(content_h - text_bottom),
                })
            }
        })

    }

    _keyboardWillHide(e) {
       Animated.spring(this.state.keyboardOffset, {
         toValue: 0,
         friction: 6
       }).start();
    }

    shouldComponentUpdate(nextProps, nextState){

        if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn === true){
            //will redirect
            
            this.refs.modal.close();
            this.toMain();
            return false;
        }
        if(nextProps.status == 'doing'){
            //loggining
            this.refs.modal.open();
            return false;
        }
        if(nextProps.status == 'error' || nextProps.status == 'done'){
            this.refs.modal.close();
            return false;
        }

        return true;
    }

    toMain(){
        const {router} = this.props;
        router.toMain();
    }

    handleLogin(){
        if(!this.state.username || !this.state.password){
            AlertIOS.alert(
                 'username, password?'
            );
            return;
        }
        let opt = {
            'name': this.state.username,
            'password': this.state.password,
        };
        this.props.dispatch(logIn(opt));
    }

    handleRegister(){
        const {dispatch} = this.props;
        dispatch(skipLogin());
    }

    onChangeName(text){
        this.setState({'username': text});
    }

    onChangePswd(text){
        this.setState({'password': text});
    }


    render(){
        return (
            <Animated.View style={[commonStyle.wrapper, {marginTop: this.state.keyboardOffset, backgroundColor: 'blue'}]}>
          <View style={[commonStyle.wrapper, loginStyle.loginWrap, {backgroundColor: 'blue'}]}>
            <Image source={require('../imgs/icons/bg.png')} style={{resizeMode: 'stretch'}}>
                <View style={loginStyle.loginMain}>
                    <View style={loginStyle.loginMainCon}>
                        <View style={loginStyle.comCulture}>
                            <Text style={[commonStyle.textCenter,{color:'#ccc'}]}>Welcome</Text>
                            <Text style={[commonStyle.textCenter,{color:'#ccc'}]}>You are the best.</Text>
                        </View>
                        <View style={loginStyle.formStyle}>
                            <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
                                <Image source={require('../imgs/icons/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                <TextInput 
                                    ref="login_name" 
                                    placeholder='username' 
                                    style={loginStyle.loginInput} 
                                    onChangeText={this.onChangeName.bind(this)} />
                            </View>
                            <View style={loginStyle.formInput}>
                                <Image source={require('../imgs/icons/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                <TextInput 
                                    ref="login_psw"  
                                    style={loginStyle.loginInput} 
                                    secureTextEntry={true}
                                    placeholder='password' 
                                    onChangeText={this.onChangePswd.bind(this)} />
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <View style={loginStyle.forget}>
                                <View>
                                    <Image source={require('../imgs/icons/prompt.png')} style={{width:15,height:15,resizeMode: 'contain',marginRight:10}}/>
                                </View>
                                <View >
                                    <Text style={{color:'#62a2e0', backgroundColor: 'white'}}>forget password?</Text>
                                </View>
                                </View>
                            </View>
                        </View>
                        <View style={loginStyle.btn}>
                            <View style={loginStyle.btnWrap}>
                                <Text style={loginStyle.loginBtn1} onPress={this.handleLogin.bind(this)}>Log in</Text>
                            </View>
                            <View style={loginStyle.btnWrap}>
                                <Text style={loginStyle.loginBtn2} onPress={this.handleRegister.bind(this)}>Skip</Text>
                            </View>
                        </View>
                    </View>
                    
                    
                </View>
            </Image>

           <ModalBox style={[commonStyle.modal,commonStyle.justAlign]} 
                    ref={"modal"} backdropPressToClose={false} 
                     animationDuration={10}
                     backdrop={true}
                     backdropOpacity={0}
                     >
                <Spinner style={commonStyle.spinner} 
                    isVisible={true} 
                    size={50} type="Arc" color="#FFFFFF"/>
            </ModalBox>


          </View>
          </Animated.View>
        );
    }
}



function select(store){
  return {
    isLoggedIn: store.userStore.isLoggedIn,
    user: store.userStore.user,
    status: store.userStore.status,
  }
}


export default connect(select)(LoginPage);


