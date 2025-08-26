import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreateresonsibleOrElderly({ navigation }) {
  return (
    <LinearGradient colors={['#ffffff', '#f2e6ff']} style={styles.container}>
      <Text style={styles.infoText}>Criar conta</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('CreateAccountScreen')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Responsável</Text>
      </TouchableOpacity>

      <Text style={styles.colorOr}>Ou</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('CreateAccountScreen')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Idoso</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Já tem uma conta?{' '}
        <Text
          onPress={() => navigation.navigate('LoginAccountScreen')}
          style={styles.link}
        >
          Entrar
        </Text>
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  infoText: {
    textAlign: 'center',
    fontSize: 35,
    color: '#9C4DCC',
    marginBottom: 20
  },
  button: {
    marginHorizontal: 50,
    backgroundColor: '#D8A6F5',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  buttonText: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 22
  },
  link: {
    color: '#9C4DCC',
    fontWeight: 'bold'
  },
  colorOr: {
    color: '#9C4DCC',
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 16
  }
});
