import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('CreateAccountScreen');
      });
    }, 2000);
  }, []);

  return (
    <LinearGradient
      colors={['#f8c8f8', '#c8f8c8']}
      style={styles.container}
    >
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require('../assets/OldionLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 150,
  },
});
