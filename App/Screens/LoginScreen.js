import React, {Component, useState} from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import TextInputComponent from '../Components/TextInputComponent'
import ButtonComponent from '../Components/ButtonComponent'
import {LoginUser} from '../Firebase/LoginUser';
import Firebase from '../Firebase/firebaseConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable';

class Login extends Component {
    state = {
        email: "",
        password: "",
        loader: false
    }

    async componentDidMount(){
        this.setState({loader: true})
        const uid= await AsyncStorage.getItem('UID');
        if(uid){
            this.props.navigation.navigate('Dashboard');
            this.setState({loader: false})
        }
        this.setState({loader: false})
    }

    LogintoFirebase = async () => {
        if(!this.state.email)
        {
            return alert('Please Enter Email');
        }
        if(!this.state.password)
        {
            return alert('Please Enter Password');
        }
        this.setState({loader:true})
        LoginUser(this.state.email, this.state.password).
        then(async (res) => {
            // console.log(res)
            const uid = Firebase.auth().currentUser.uid;
            await AsyncStorage.setItem('UID', uid);
            this.setState({loader:false})
            this.props.navigation.navigate('Dashboard');
        }).
        catch((err) => {
            this.setState({loader:false})
            alert(err);
        })
    }

    render() {
        return (
            <View style={styles.container}>
            {/* <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}></View> */}
                <ImageBackground source={require('../../assets/chatting.jpg')} style={styles.backgroundImage}>
                
                <View style={styles.header}>
                    <Image source={require('../../assets/obrolwhite.png')} style={{width:200, height:200, borderRadius: 30, alignSelf: 'center'}}/>
                    <Text style={styles.text_header}>Welcome to Obrol</Text>
                </View>
                
                <Animatable.View animation='fadeInUp' easing='ease-out-expo' style={styles.footer}>
                    <Text style={styles.text_footer}>
                        <Text style={[styles.text_footer,{fontWeight: 'bold', fontSize: 72, color: '#6B48DE'}]}>Obrol</Text>in apa aja, bareng siapa aja!
                    </Text>
                    <TextInputComponent placeholder="Enter Email" updateFields={(text) => this.setState({ email: text })} />
                    <TextInputComponent placeholder="Enter Password" updateFields={(text) => this.setState({ password: text })} />
                    <ButtonComponent title="Login" onPress={() => { this.LogintoFirebase() }} />
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUp') }}>
                        <Text style={styles.navButtonText}>New User? Click Here</Text>
                    </TouchableOpacity>
                </Animatable.View>
                <Spinner
                    visible={this.state.loader}

                />

                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6B48DE'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    text_header: {
        color: '#fff',
        fontSize: 32,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 2,
        backgroundColor: '#f9fafd',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#6B48DE',
        alignSelf: 'center'
    },
    text_footer: {
        color: '#6B48DE',
        fontSize: 32,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20,
    },
})

export default Login