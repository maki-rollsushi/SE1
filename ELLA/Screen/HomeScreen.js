import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function SignUp() {
  const [fontsLoaded] = useFonts({
    PixelifySans: require("../assets/fonts/PixelifySans-Regular.ttf"),
    PixelifySansBold: require("../assets/fonts/PixelifySans-Bold.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    Mochi: require("../assets/fonts/MochiyPopOne.ttf"),
  });

  const handleMenuPress = () => {
    console.log("Menu icon pressed!");
    // You can navigate or open a drawer here
    // navigation.openDrawer();
  };

  const navigation = useNavigation();
  const [name, setName] = useState("");

  const handleNameEntry = () => {
    //for backend go Vik!
    console.log("Name entered:", name);
    navigation.navigate("RoleSelect");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          <Ionicons name="menu-outline" size={45} style={styles.menu} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.title}>ELLA</Text>
          <Text style={styles.subTitle}>Your English Buddy</Text>
        </View>
      </View>
      <View styles={styles.content}>
        <Text style={styles.readText}>Let's Read!</Text>
      </View>
    </View>
  );
}

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#60B5FF",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  headerText: { flexDirection: "column" },
  title: {
    fontFamily: "PixelifySans",
    fontSize: 24,
    textAlign: "center",
    color: "#fff",
  },
  subTitle: {
    fontFamily: "PixelifySans",
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
  },
  menu: {
    marginRight: 40,
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  readText: {
    fontFamily: "Mochi",
    fontSize: 36,
    color: "#fff",
    textAlign: "center",
  },
});
