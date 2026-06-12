import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

interface Props {
  onFinish: () => void;
}

export default function PantallaBienvenida({ onFinish }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.delay(3500),
      Animated.timing(opacity, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start(() => onFinish());
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image source={require('../assets/images/logo2.png')} style={styles.logoGrande} resizeMode="contain" />
      <View style={styles.logosAbajo}>
        <Image
          source={require('../assets/images/ESCoFunded.png')}
          style={styles.logoSmall}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/images/ESPeducarcura.png')}
          style={styles.logoSmall}
          resizeMode="contain"
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', padding: 40,
  },
  logoGrande: { width: 220, height: 220, marginBottom: 60 },
  logosAbajo: {
    flexDirection: 'row', gap: 24, alignItems: 'center',
    position: 'absolute', bottom: 60,
  },
  logoSmall: { width: 120, height: 60 },
});
