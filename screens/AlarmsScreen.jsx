import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export default function AlarmsScreen({ navigation }) {
  const [alarms, setAlarms] = useState([]);
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadAlarms();
    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadAlarms = async () => {
    try {
      const savedAlarms = await AsyncStorage.getItem('alarms');
      if (savedAlarms) setAlarms(JSON.parse(savedAlarms));
    } catch (error) {
      console.log(error);
    }
  };

  const saveAlarms = async (newAlarms) => {
    try {
      await AsyncStorage.setItem('alarms', JSON.stringify(newAlarms));
      setAlarms(newAlarms);
    } catch (error) {
      console.log(error);
    }
  };

  const playAlarmSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/Sounds/alarm.mp3')
    );
    await sound.playAsync();
  };

  const checkAlarms = () => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    alarms.forEach((alarm) => {
      if (alarm.time === currentTime) {
        playAlarmSound();
      }
    });
  };

  const handleTimeChange = (text) => {
    let formatted = text.replace(/[^0-9]/g, '');
    if (formatted.length >= 3) {
      formatted = `${formatted.slice(0, 2)}:${formatted.slice(2, 4)}`;
    }
    setTime(formatted);
  };

  const handleAddAlarm = () => {
    if (time && description) {
      const newAlarms = [...alarms, { time, description }];
      saveAlarms(newAlarms);
      setTime('');
      setDescription('');
    }
  };

  const handleCancelAlarm = (index) => {
    const newAlarms = alarms.filter((_, i) => i !== index);
    saveAlarms(newAlarms);
  };

  const renderAlarmItem = ({ item, index }) => (
    <View style={styles.alarmBox}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View>
          <Text style={styles.alarmTime}>{item.time}</Text>
          <Text style={styles.alarmDesc}>{item.description}</Text>
        </View>
        <TouchableOpacity style={styles.checkBox} />
      </View>

      <TouchableOpacity style={styles.stopButton} onPress={() => handleCancelAlarm(index)}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Parar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Alarmes</Text>

      {/* CARD */}
      <View style={styles.card}>
        <FlatList
          data={alarms}
          renderItem={renderAlarmItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum alarme adicionado</Text>}
        />

        {/* Inputs */}
        <TextInput
          placeholder="Horário:"
          value={time}
          onChangeText={handleTimeChange}
          style={styles.input}
          keyboardType="numeric"
          maxLength={5}
        />
        <TextInput
          placeholder="Descrição:"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddAlarm}>
          <Text style={{ fontWeight: "bold", color: "#000" }}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <Ionicons onPress={() => navigation.navigate('ElderlyAccountScreen')} name="home" size={32} color="#000" />
        <Ionicons onPress={() => navigation.navigate('ProfileScreen')} name="person-outline" size={32} color="#000" />
        <Ionicons name="settings-outline" size={32} color="#000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#C7F7A6",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    bottom: -10
  },
  backButton: { flexDirection: "row", alignItems: "center" },
  backText: { marginLeft: 5, fontSize: 16, fontWeight: "bold" },
  title: { textAlign: "center", fontSize: 22, fontWeight: "bold", marginVertical: 15 },
  card: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  alarmBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20
  },
  alarmTime: { fontSize: 18, fontWeight: "bold" },
  alarmDesc: { fontSize: 14, color: "#555" },
  stopButton: {
    backgroundColor: "#D7A9F7",
    padding: 8,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },
  addButton: {
    backgroundColor: "#C7F7A6",
    padding: 12,
    borderRadius: 10,
    alignItems: "center"
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E6C7F7",
    paddingVertical: 20,
    position: "absolute",
    bottom: 30,
    height: 70,
    width: "100%"
  },
  emptyText: { textAlign: "center", color: "#aaa", marginVertical: 10 }
});
