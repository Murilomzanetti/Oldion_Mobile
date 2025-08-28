import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlarmsScreen({ navigation }) {
  const [addingAlarm, setAddingAlarm] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // <-- Novo estado para edição

  useEffect(() => {
    loadAlarms();
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

  const handleAddOrEditAlarm = () => {
    if (time && description) {
      let newAlarms;
      if (editingIndex !== null) {
        // Editando um alarme existente
        newAlarms = [...alarms];
        newAlarms[editingIndex] = { time, description };
        setEditingIndex(null);
      } else {
        // Adicionando novo alarme
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
              onChangeText={setTime}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição:"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAddOrEditAlarm}>
              <Text style={styles.addButtonText}>
                {editingIndex !== null ? 'Salvar Alterações' : 'Salvar Alarme'}
              </Text>
            </TouchableOpacity>
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
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  header: {
    height: 60,
    backgroundColor: '#D9FF9F',
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 5, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    width: '90%',
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
  },
  alarmItem: { marginBottom: 20, alignItems: 'center' },
  alarmTime: { fontSize: 20, fontWeight: 'bold' },
  alarmDesc: { fontSize: 16, marginBottom: 10 },
  buttonsRow: { flexDirection: 'row', gap: 10 },
  editButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonText: { fontWeight: 'bold', color: '#000' },
  addButton: {
    backgroundColor: '#A7ECA9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 10,
  },
  addButtonText: { fontWeight: 'bold', textAlign: 'center' },
  input: {
    borderWidth: 2,
    borderColor: '#9C4DCC',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 20,
    color: '#000',
  },
  emptyText: { fontSize: 18, color: '#999', textAlign: 'center', marginVertical: 20 },
  bottomBar: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D9A4E8',
    width: '100%',
    paddingVertical: 30,
    shadowColor: '#000',
    shadowRadius: 0.2,
  },
});
