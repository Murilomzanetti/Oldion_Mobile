import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ConnectBraceletScreen({ navigation }) {
  const [bluetoothPopup, setBluetoothPopup] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleOpenBluetooth = () => {
    setBluetoothPopup(true);
    setTimeout(() => {
      setBluetoothPopup(false);
      setConnected(true);
    }, 2000); // Simula tempo de conexão
  };

  return (
    <LinearGradient colors={['#ffffff', '#f2e6ff']} style={styles.container}>
      <Text style={styles.title}>Conectar com sua pulseira Oldion</Text>

      <TouchableOpacity
        style={[styles.connectButton, connected && styles.connectedButton]}
        onPress={handleOpenBluetooth}
        disabled={connected}
      >
        <Text style={styles.buttonText}>
          {connected ? 'Conectar ✓' : 'Conectar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ElderlyAccountScreen')} style={styles.createButton}>
        <Text style={styles.createText}>Criar</Text>
      </TouchableOpacity>

      {/* POPUP BLUETOOTH */}
      {/*Zanetti estuda sobre Modal*/ }
      <Modal visible={bluetoothPopup} transparent animationType="fade">
        <View style={styles.modalBackground}> 
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Bluetooth</Text>
            <Text style={styles.modalText}>Pulseira Oldion</Text>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Conectar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    color: '#9C4DCC',
    textAlign: 'center',
    marginBottom: 40,
  },
  connectButton: {
    backgroundColor: '#B3FFB3',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginBottom: 15,
  },
  connectedButton: {
    backgroundColor: '#B3FFB3',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#E0B3FF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
  },
  createText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#4B0082',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: 200,
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    color: '#FFF',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#4B0082',
    fontWeight: 'bold',
  },
});
