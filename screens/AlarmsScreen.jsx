import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export default function AlarmsScreen({ navigation }) {
  const [addingAlarm, setAddingAlarm] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

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

  const handleAddOrEditAlarm = () => {
    if (time && description) {
      let newAlarms;
      if (editingIndex !== null) {
        newAlarms = [...alarms];
        newAlarms[editingIndex] = { time, description };
        setEditingIndex(null);
      } else {
        newAlarms = [...alarms, { time, description }];
      }
      saveAlarms(newAlarms);
      setTime('');
      setDescription('');
      setAddingAlarm(false);
    }
  };

  const handleCancelAlarm = (index) => {
    const newAlarms = alarms.filter((_, i) => i !== index);
    saveAlarms(newAlarms);
  };

  const handleEditAlarm = (index) => {
    setTime(alarms[index].time);
    setDescription(alarms[index].description);
    setEditingIndex(index);
    setAddingAlarm(true);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setTime('');
    setDescription('');
    setAddingAlarm(false);
  };

  const renderAlarmItem = ({ item, index }) => (
    <View style={styles.alarmItem}>
      <Text style={styles.alarmTime}>{item.time}</Text>
      <Text style={styles.alarmDesc}>{item.description}</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditAlarm(index)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelAlarm(index)}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Alarmes</Text>

      <View style={styles.card}>
        {!addingAlarm ? (
          <>
            <FlatList
              data={alarms}
              renderItem={renderAlarmItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={<Text style={styles.emptyText}>Nenhum alarme adicionado</Text>}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => setAddingAlarm(true)}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              placeholder="Horário:"
              value={time}
              onChangeText={handleTimeChange}
              style={styles.input}
              keyboardType='numeric'
              maxLength={5}
            />
            <TextInput
              placeholder="Remédio:"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAddOrEditAlarm}>
              <Text style={styles.addButtonText}>
                {editingIndex !== null ? 'Salvar Alterações' : 'Salvar Alarme'}
              </Text>
            </TouchableOpacity>

            {editingIndex !== null && (
              <TouchableOpacity style={styles.cancelEditButton} onPress={handleCancelEdit}>
                <Text style={styles.buttonText}>Cancelar Edição</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>

      <View style={styles.bottomBar}>
        <Ionicons name="home" size={32} color="#000" />
        <Ionicons name="person-outline" size={32} color="#000" />
        <Ionicons name="settings-outline" size={32} color="#000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    color: '#9C4DCC',
    marginBottom: 20
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
  alarmItem: {
    borderWidth: 1,
    borderColor: '#9C4DCC',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFF'
  },
  alarmTime: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#9C4DCC'
  },
  alarmDesc: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  editButton: {
    backgroundColor: '#9C4DCC',
    padding: 10,
    borderRadius: 10
  },
  cancelButton: {
    backgroundColor: '#FF5C5C',
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16
  },
  addButton: {
    backgroundColor: '#9C4DCC',
    padding: 15,
    borderRadius: 15,
    marginTop: 15
  },
  addButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  cancelEditButton: {
    backgroundColor: '#FF5C5C',
    padding: 15,
    borderRadius: 15,
    marginTop: 10
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999'
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backText: {
    marginLeft: 5,
    fontSize: 18
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 15
  }
});
