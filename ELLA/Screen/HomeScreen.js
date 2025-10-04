import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image as RNImage,
} from "react-native";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { users, books } from "../Data/data";
import { ImageBackground } from "react-native";

export default function SignUp() {
  const [fontsLoaded] = useFonts({
    PixelifySans: require("../assets/fonts/PixelifySans-Regular.ttf"),
    PixelifySansBold: require("../assets/fonts/PixelifySans-Bold.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    Mochi: require("../assets/fonts/MochiyPopOne.ttf"),
  });

  const currUser = users[0];
  const currBook = books[0];

  const characterImages = {
    pink: require("../assets/animations/jump_pink.gif"),
    dino: require("../assets/animations/jump_dino.gif"),
    owl: require("../assets/animations/jump_owl.gif"),
  };

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
        <TouchableOpacity
          onPress={handleMenuPress}
          style={styles.avatarContainer}
        >
          <Image
            source={characterImages[currUser.character]}
            style={styles.characterImage}
          />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.title}>ELLA</Text>
          <Text style={styles.subTitle}>Your English Buddy</Text>
        </View>
        <View style={styles.badgeContainer}>
          <Image
            source={require("../assets/icons/diamond.png")}
            style={styles.diamondIcon}
            resizeMode="contain"
          />
          <Text style={styles.amountText}>{currUser.points}</Text>
        </View>
      </View>
      <View styles={styles.content}>
        <Text style={styles.readText}>Let's Read!</Text>
      </View>
      <TouchableOpacity style={styles.bookCard}>
        <RNImage source={{ uri: currBook.cover }} style={styles.bookImage} />
        <Text style={styles.bookTitle}>{currBook.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

//Styling
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(96, 181, 255, 1)", // optional overlay tint
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(96, 181, 255, 0.85)", // optional blue overlay for readability
    width: "100%",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // optional: space out items evenly
    width: "95%", // make it span the top
    marginBottom: 30,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 60,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  headerText: { flexDirection: "column", marginRight: 50 },
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
    fontSize: 40,
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
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // translucent dark blue
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50, // makes it pill-shaped
    paddingVertical: 1,
    paddingHorizontal: 10,
  },
  diamondIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  amountText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins",
  },
  bookCard: {
    borderRadius: 15,
    width: "60%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  bookImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  bookTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#000000ff",
  },
});
