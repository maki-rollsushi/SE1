import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const navigation = useNavigation();
  const [role, setRole] = useState(null);

  const saveRole = (selectedRole) => {
    setRole(selectedRole);
    // backend save
    console.log("Role selected:", selectedRole);
  };

  const getRole = () => {
    // later: return role value
    return role;
  };

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Are you a?</Text>

      {/* Role Buttons */}
      <Image
        source={require("../assets/animations/jump_pink.gif")}
        style={styles.gif}
        contentFit="fill"
        transition={0}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => saveRole("Student")}
      >
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => saveRole("Teacher")}
      >
        <Text style={styles.buttonText}>Teacher</Text>
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
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: "Poppins",
    fontSize: 18,
    color: "#60B5FF",
    fontWeight: "bold",
  },
});
