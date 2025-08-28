import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ConnectBraceletScreen({ navigation }) {
  const [bluetoothPopup, setBluetoothPopup] = useState(false);
  const [connected, setConnected] = useState(false);
  const [devices, setDevices] = useState([]);

  const fakeDevices = [
    { id: '1', name: 'Oldion Pulseira' },
    { id: '2', name: 'Fone Bluetooth' },
    { id: '3', name: 'Caixa de Som' },
  ];

  const handleOpenBluetooth = () => {
    setBluetoothPopup(true);
    // Simula busca de aparelhos próximos
    setTimeout(() => {
      setDevices(fakeDevices);
    }, 1000);
  };

  const handleConnectDevice = (device) => {
    setConnected(true);
    setBluetoothPopup(false);
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
          {connected ? 'Conectado ✓' : 'Conectar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ElderlyAccountScreen')}
        style={[styles.createButton, !connected && { backgroundColor: '#ccc' }]}
        disabled={!connected}
      >
        <Text style={styles.createText}>Criar</Text>
      </TouchableOpacity>

      {/* POPUP BLUETOOTH */}
      <Modal visible={bluetoothPopup} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Bluetooth</Text>
            {devices.length === 0 ? (
              <Text style={styles.modalText}>Procurando dispositivos...</Text>
            ) : (
              <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => handleConnectDevice(item)}
                  >
                    <Text style={styles.modalButtonText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
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
    fontSize: 32,
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
    width: 250,
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    color: '#FFF',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#4B0082',
    fontWeight: 'bold',
  },
});
