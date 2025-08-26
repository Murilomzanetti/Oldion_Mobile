import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ElderlyAccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Faixa superior verde */}
      <View style={styles.header} />

      {/* Título */}
      <Text style={styles.title}>Idosos</Text>

      {/* Card principal */}
      <View style={styles.cardContainer}>
        <View style={styles.personCard}>
          <Image
            source={require('../assets/Ellipse3.png')} 
            style={styles.avatar}
          />
          <Text style={styles.name}>Juca</Text>
          <Icon name="alert-circle-outline" size={22} color="#000" />
        </View>
      </View>

      {/* Botão adicionar */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>
          Adicionar pessoas para{'\n'}monitorar idoso(s)
        </Text>
      </TouchableOpacity>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomBar}>
        <Icon name="home" size={32} color="#000" />
        <Icon name="person-outline" size={32} color="#000" />
        <Icon name="settings-outline" size={32} color="#000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    height: 60,
    backgroundColor: '#D9FF9F',
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  cardContainer: {
    backgroundColor: '#D9A4E8',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    borderWidth: 2,
    borderColor: '#000',
  },
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#D9A4E8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  addButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
