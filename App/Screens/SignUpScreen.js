import React, {Component} from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity} from 'react-native';
import TextInputComponent from '../Components/TextInputComponent'
import ButtonComponent from '../Components/ButtonComponent'
import {SignUp} from '../Firebase/SignUp';
import {AddUser} from '../Firebase/Users';
import Firebase from '../Firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'

class SignUpSCR extends Component{
    state = {
        name:"",
        email:"",
        password:"",
        loader:false
    }

    SignUptoFirebase = async ()=>{
        if(!this.state.name)
        {
            return alert('Please Enter Name');
        }
        if(!this.state.email)
        {
            return alert('Please Enter Email');
        }
        if(!this.state.password)
        {
            return alert('Please Enter Password');
        }
        this.setState({loader:true})
        SignUp(this.state.email, this.state.password)
        .then(async (res) => {
            // console.log('res', res);
            var userUID = Firebase.auth().currentUser.uid;
            AddUser(this.state.name,this.state.email,'',userUID,[0])
            .then(async ()=>{
                this.setState({loader:false})
                await AsyncStorage.setItem('UID', uid);
                this.props.navigation.navigate('Dashboard')
            })
            .catch((error)=>{
                this.setState({loader:false})
                alert(error);
            })
            // console.log(userUID);
        }).catch((err) => {
            alert(err);
        })
    }
    render() {
        return(
            <View style={styles.container}> 
            <StatusBar barStyle='dark-content'/>
            {/* <View style={{flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center'}}>  */}
            <Text style={styles.text}>Register </Text>
            <TextInputComponent placeholder="Enter Name" updateFields={(text) => this.setState({ name: text })} />
                <TextInputComponent placeholder="Enter Email" updateFields={(text) => this.setState({ email: text })} />
                <TextInputComponent placeholder="Enter Password" updateFields={(text) => this.setState({ password: text })} />
                <ButtonComponent title="Sign Up" onPress={() => { this.SignUptoFirebase() }} />
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
                    <Text style={styles.navButtonText}>Have an account? Sign in</Text>
                </TouchableOpacity>
                <Spinner
                    visible={this.state.loader}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex:1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        // paddingTop: 50,
      },
      text: {
        fontSize: 54,
        marginBottom: 10,
        padding: 20,
        paddingTop: '10%',
        paddingBottom: '10%',
        color: '#6B48DE',
        alignSelf: 'flex-start',
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#6B48DE',
        alignSelf: 'center'
    },
})
export default SignUpSCR