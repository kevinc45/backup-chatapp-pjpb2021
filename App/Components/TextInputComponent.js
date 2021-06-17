import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../Components/Dimensions';

class TextInputComponent extends Component {
    render() {
        const { placeholder, updateFields, } = this.props;
        return (
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor='#000'
                    onChangeText={text => updateFields(text)}
                    secureTextEntry={placeholder == "Enter Password"  ? true : false} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        height: 50,
        marginBottom: 10,
        width: '85%',
    },
    textInput: {
        paddingHorizontal: 10,
        width: '90%',
        paddingVertical: 0,
        color: '#000',
    },
    inputContainer: {
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 10,
        width: '90%',
        height: windowHeight / 15,
        borderColor: '#ccc',
        borderRadius: 8,
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
        padding: 20,
        marginTop: 0,
        marginBottom: 0,
        width: windowWidth / 1.2,
        height: windowHeight / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 0,
    },
});



export default TextInputComponent;