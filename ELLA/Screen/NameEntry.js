import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState("");

  const handleNameEntry = () => {
    console.log("Name entered:", name); //for backend
    navigation.navigate("RoleSelect");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={32} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>What's your {"\n"} Name?</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="black"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button} onPress={handleNameEntry}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#60B5FF",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontFamily: "Mochi",
    fontSize: 36,
    textAlign: "center",
    margin: 50,
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 250,
    height: 50,
    fontFamily: "Poppins",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins",
    fontSize: 18,
    color: "#60B5FF",
    fontWeight: "bold",
  },
});
