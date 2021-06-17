import React, { Component } from 'react';
import { TouchableOpacity, Text, View ,StyleSheet} from 'react-native';
import { windowHeight, windowWidth } from '../Components/Dimensions';

class ButtonComponent extends Component {
    render() {
        const { title, onPress } = this.props;
        return (
            <TouchableOpacity onPress={() => onPress()} style={styles.button}>
                <View style={styles.mainContainer}>
                    <Text style={styles.textStyle}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 50,
        marginBottom: 5,
        width: '85%',
        paddingHorizontal: 6,
        backgroundColor: '#6B48DE',
        margin: 10
    },
    textStyle: {
        fontSize: 18,
        fontWeight:'bold',
        color: '#fff'
    }
});




export default ButtonComponent;