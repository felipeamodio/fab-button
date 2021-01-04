import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import {AntDesign, Entypo} from '@expo/vector-icons';

export default class FabButton extends Component {
    animation = new Animated.Value(0);

toggleMenu = () => {
    const toValue = this.open ? 0 : 1 //primeiro começa em 1 e quando clicamos ele vai p/ 0
    Animated.spring(this.animation, {
        toValue,
        friction: 6, //efeito de estilingue
        useNativeDriver: 'true'
    }).start();

    this.open = !this.open;
}

 render(){


  const cameraStyle = {
      transform: [
          { scale: this.animation },
          {
              translateY: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -60]
              })
          }
      ]
  }  

  const likeStyle = {
    transform: [
        { scale: this.animation },
        {
            translateY: this.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -125]
            })
        }
    ]
} 

  const rotation = {
      transform: [
          {
              rotate: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "45deg"]
              })
          }
      ]
  }

  return (
    <View style={[styles.container, this.props.style]}>
        <TouchableWithoutFeedback onPress={ () => alert('CURTIR')}>
            <Animated.View style={[styles.button, styles.submenu, likeStyle]}>
                <AntDesign name="heart" size={20} color="#FFFFFF" />
            </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={ () => alert('CÂMERA')}>
            <Animated.View style={[styles.button, styles.submenu, cameraStyle]}>
                <Entypo name="camera" size={20} color="#FFFFFF" />
            </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
            <Animated.View style={[styles.button, styles.menu, rotation]}>
                <AntDesign name="plus" size={24} color="#FFFFFF" />
            </Animated.View>
        </TouchableWithoutFeedback>
    </View>
   );
 }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute'
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 10,
        shadowColor: '#00213B',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10
        }
    },
    menu: {
        backgroundColor: '#00213B'
    },
    submenu: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#00213B'
    }
})