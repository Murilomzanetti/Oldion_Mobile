import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreateAccountScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <LinearGradient colors={['#ffffff', '#f2e6ff']} style={styles.container}>
      <Text style={styles.infoText}>
        Conta de responsável é do usuário que ajuda o idoso e tem acesso a suas informações
      </Text>

      <View style={styles.line} />

      <TextInput
        style={styles.input}
        placeholder="Inserir e-mail"
        placeholderTextColor="#9C4DCC"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Criar uma senha"
        placeholderTextColor="#9C4DCC"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#9C4DCC"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.line} />

      <TouchableOpacity
        onPress={() => navigation.navigate('CreateYourNameScreen')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Continuar</Text>
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
  line: {
    borderBottomColor: '#9C4DCC',
    borderBottomWidth: 2,
    marginVertical: 15
  },
  input: {
    borderWidth: 2,
    borderColor: '#9C4DCC',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 20,
    color: '#000'
  },
  button: {
    backgroundColor: '#D8A6F5',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 22
  },
  link: {
    color: '#9C4DCC',
    fontWeight: 'bold'
  }
});
