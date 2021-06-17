import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {View, Text, TouchableOpacity, FlatList, Image, StatusBar} from 'react-native';
import firebase from '../Firebase/firebaseConfig'
import Spinner from 'react-native-loading-spinner-overlay'
import {launchCamera,launchImageLibrary} from 'react-native-image-picker'
import AppHeader from '../Components/AppHeader'
import {UpdateUserImage} from '../Firebase/Users'
import ImgToBase64 from 'react-native-image-base64'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

class Dashboard extends Component {
    state = {
        allUsers: [],
        loader: false,
        imageUrl:'',
        loggedInUserName:''
    }

    async componentDidMount() {
        try {
            this.setState({ loader: true })
            await firebase.database().ref('users')
                .on("value", async (datasnapshot) => {
                    const uuid = await AsyncStorage.getItem('UID');
                    new Promise((resolve, reject) => {
                        let users = [];
                        let lastMessage = '';
                        let lastDate = '';
                        let lastTime = '';
                        let properDate = '';
                        // let updatecontact = ('users/' + uuid);
                        datasnapshot.forEach((child) => {
                            if (child.val().uuid === uuid) {
                                // console.log('ff', child.val().image);
                                this.setState({ loggedInUserName: child.val().name, imageUrl: child.val().image }) 
                            }
                        });
                        const ref = firebase.database().ref('Users').child(uuid).child('contactsuuid');
                            ref.startAt(0).on("value", function(snapshot){
                                
                        });
                        // var query = firebase.database().ref('users').child(uuid).child('contactsuuid').orderByKey();
                        // query.once("value")
                        //     .then(function(dataSnapshot){
                        //     dataSnapshot.foreach((child) => {
                        //         let newUser = {
                        //             userId: '',
                        //             userName: '',
                        //             userProPic: '',
                        //             lastMessage: '',
                        //             lastDate: '',
                        //             lastTime: '',
                        //             properDate: ''
                        //         }
                        //         if('value' != 0){
                        //             new Promise((resolve, reject) => {
                        //                 firebase.database().ref('messages').
                        //                     child(uuid).child(child.val().uuid).orderByKey().limitToLast(1).on('value', (dataSnapshots) => {
                        //                         if (dataSnapshots.val()) {
                        //                             dataSnapshots.forEach((child) => {
                        //                                 lastMessage = child.val().messege.image !== '' ? 'Photo' : child.val().messege.msg;
                        //                                 lastDate = child.val().messege.date;
                        //                                 lastTime = child.val().messege.time;
                        //                                 properDate = child.val().messege.date + " " + child.val().messege.time
                        //                             });
                        //                         }
                        //                         else {
                        //                             lastMessage = '';
                        //                             lastDate = '';
                        //                             lastTime = '';
                        //                             properDate = '';
                        //                         }
                        //                         newUser.userId = child.val().uuid;
                        //                         newUser.userName = child.val().name;
                        //                         newUser.userProPic = child.val().image;
                        //                         newUser.lastMessage = lastMessage;
                        //                         newUser.lastTime = lastTime;
                        //                         newUser.lastDate = lastDate;
                        //                         newUser.properDate = properDate;
                        //                         return resolve(newUser);
                        //                     });
                        //             }).then((newUser) => {
                        //                 users.push({
                        //                     userName: newUser.userName,
                        //                     uuid: newUser.userId,
                        //                     imageUrl: newUser.userProPic,
                        //                     lastMessage: newUser.lastMessage,
                        //                     lastTime: newUser.lastTime,
                        //                     lastDate: newUser.lastDate,
                        //                     properDate: newUser.lastDate ? new Date(newUser.properDate) : null
                        //                 });
                        //                 this.setState({ allUsers: users.sort((a, b) => b.properDate - a.properDate) });
                        //             });
                        //             return resolve(users);
                        //         }
                        //     }
                        // )})
                    }).then((users) => {
                        this.setState({ allUsers: users.sort((a, b) => b.properDate - a.properDate) });
                    })
                    this.setState({ loader: false })
                })
            } catch (error) {
                alert(error);
                this.setState({ loader: false })
            }
        }

    logOut = async () => {
        await firebase.auth().signOut().then(async () => {
            await AsyncStorage.removeItem('UID');
            this.props.navigation.navigate('Login');
        }).catch((err) => {
            alert(err);
        })
    }

    async openGallery() {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        // let base64 = await ImgToBase64.getBase64String(pickerResult.uri)
        await FileSystem.readAsStringAsync(pickerResult.uri, { encoding: 'base64' })
        .then(async (base64String) => {
            this.setState({ loader: true });
            const uid = await AsyncStorage.getItem('UID');
            let source = "data:image/jpeg;base64," + base64String;
            UpdateUserImage(source, uid).
                then(() => {
                    this.setState({ imageUrl: response.uri, loader: false });
                })
        })
        .catch(err => this.setState({ loader: false }));
        // console.log(base64);
        // console.log(base64);
        // launchImageLibrary('photo', (response) => {
        //     this.setState({ loader: true });
        //     ImgToBase64.getBase64String(response.uri)
        //         .then(async (base64String) => {
        //             const uid = await AsyncStorage.getItem('UID');
        //             let source = "data:image/jpeg;base64," + base64String;
        //             UpdateUserImage(source, uid).
        //                 then(() => {
        //                     this.setState({ imageUrl: response.uri, loader: false });
        //                 })
        //         })
        //         .catch(err => this.setState({ loader: false }));
        // })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle='default'/>
                <AppHeader title="Messages" navigation={this.props.navigation} onPress={() => this.logOut()} />
                <FlatList
                    alwaysBounceVertical={false}
                    data={this.state.allUsers}
                    style={{ padding: 5 }}
                    keyExtractor={(_, index) => index.toString()}
                    ListHeaderComponent={
                        <View style={{ height: 160, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ height: 90, width: 90, borderRadius: 45 }} onPress={() => { this.openGallery() }}>
                                <Image source={{ uri: this.state.imageUrl==='' ? 'https://github.com/danilaudza/valorRankImages/blob/main/img/iron/1.png?raw=true' : this.state.imageUrl }} style={{ height: 90, width: 90, borderRadius: 45 }} />
                            </TouchableOpacity>
                            <Text style={{ color: '#6B48DE', fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{this.state.loggedInUserName}</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 20, marginTop: 20 }} onPress={() => this.props.navigation.navigate('Chat', { UserName: item.userName, guestUid: item.uuid })}>
                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={{ uri: item.imageUrl === '' ? 'https://github.com/danilaudza/valorRankImages/blob/main/img/iron/1.png?raw=true' : item.imageUrl }} style={{ height: 50, width: 50, borderRadius: 25 }} />
                                </View>
                                <View style={{ width: '65%', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 10 }}>
                                    <Text style={{ color: '#6B48DE', fontSize: 16, fontWeight: 'bold' }}>{item.userName}</Text>
                                    <Text style={{ color: '#6B48DE', fontSize: 14, fontWeight: '600' }}>{item.lastMessage}</Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'flex-start', justifyContent: 'center', marginRight: 20 }}>
                                    <Text style={{ color: '#6B48DE', fontSize: 13, fontWeight: '400' }}>{item.lastTime}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ borderWidth: 0.5, borderColor: '#ecf0f1', width: '80%', alignSelf: 'flex-end', marginRight: 20}}/>
                        </View>
                    )}
                />
                <Spinner
                    visible={this.state.loader}
                />
            </View>
        )
    }   
}

export default Dashboard;
