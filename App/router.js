import React, {Component} from 'react';
import { View, StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import SignUp from '../App/Screens/SignUpScreen';
import Login from '../App/Screens/LoginScreen';
import Dashboard from '../App/Screens/DashboardScreen';
import Chat from '../App/Screens/ChatScreen';
import * as Animatable from 'react-native-animatable';

class splash extends Component{
    render(){
        setTimeout(() => {
            this.props.navigation.navigate('Auth');
        }, 3000)
        return(
            <View style={{backgroundColor: '#6B48DE', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <StatusBar hidden/>
            <Animatable.Image source={require('../assets/obrolwhite.png')} animation='zoomIn' easing='ease-in-out-expo' style={{alignSelf: 'center',resizeMode: 'center', width: '60%'}}/>
            </View>
        )
    }
}

const AuthStack = createStackNavigator({
    Login: Login,
    SignUp: SignUp,
}, {
    headerMode: 'none', initialRouteName: 'Login'
});

const DashboardStack = createStackNavigator({
    Dashboard: Dashboard,
    Chat:Chat
}, {
    initialRouteName: 'Dashboard', headerMode: 'none', defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS
    }
});

const App = createSwitchNavigator({
    splash: splash,
    Auth: AuthStack,
    Dashboard: DashboardStack
},
    { initialRouteName: 'splash' }
);

export default createAppContainer(App);