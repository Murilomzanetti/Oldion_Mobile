import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}></View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Avatar e nome */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }} // trocar pela foto real
            style={styles.avatar}
          />
          <View style={styles.nameRow}>
            <Text style={styles.name}>Maicon Ramon Silva</Text>
            <Ionicons name="create-outline" size={18} color="#000" style={{ marginLeft: 6 }} />
          </View>
        </View>

        {/* Card lilás */}
        <View style={styles.mainCard}>
          <Text style={styles.label}>Responsável por:</Text>
          <View style={styles.innerCard}>
            <Text style={styles.cardText}>Juca</Text>
          </View>
        </View>
      </ScrollView>

      {/* BottomBar */}
      <View style={styles.bottomBar}>
        <Ionicons name="home" size={28} color="#000" />
        <Ionicons
          name="person-outline"
          size={28}
          color="#000"
          style={styles.activeIcon}
        />
        <Ionicons name="settings-outline" size={28} color="#000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#C7F7A6",
    height: 50,
    width: "100%",
  },
  profileSection: {
    alignItems: "center",
    marginTop: -30,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mainCard: {
    margin: 20,
    backgroundColor: "#E6C7F7",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  innerCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E6C7F7",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  activeIcon: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 4,
  },
});
