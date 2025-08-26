import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreateAccountScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient
      colors={['#ffffff', '#f2e6ff']}
      style={styles.container}
    >
      <Text style={styles.infoText}>
        Criar nome de usuario
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nome completo"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
              Já tem uma conta?{' '}
              <Text style={styles.link}>
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
    justifyContent: 'center',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 40,
    color: '#9C4DCC',
    marginBottom: 20,
  },
  line: {
    borderBottomColor: '#9C4DCC',
    borderBottomWidth: 2,
    marginVertical: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 15,
    padding: 25,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 20, // Texto maior nos campos
  },
  button: {
    backgroundColor: '#D8A6F5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 25,
  },
  link: {
    color: '#9C4DCC',
    fontWeight: 'bold',
  },
});
