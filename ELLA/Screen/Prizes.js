import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { users } from "../Data/data";

export default function Prizes() {
  const [fontsLoaded] = useFonts({
    PixelifySans: require("../assets/fonts/PixelifySans-Regular.ttf"),
    PixelifySansBold: require("../assets/fonts/PixelifySans-Bold.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    Mochi: require("../assets/fonts/MochiyPopOne.ttf"),
  });

  const navigation = useNavigation();
  const currUser = users[0];

  const characterImages = {
    pink: require("../assets/animations/jump_pink.gif"),
    dino: require("../assets/animations/jump_dino.gif"),
    owl: require("../assets/animations/jump_owl.gif"),
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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

      <View style={styles.content}>
        <Text style={styles.contentText}>Prizes content coming soon!</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Ionicons name="library-outline" size={24} color="#fff" />
          <Text style={styles.footerButtonText} color="#fff">
            Library
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.footerButton, styles.activeFooterButton]}
          onPress={() => {}}
        >
          <Ionicons name="diamond-outline" size={24} color="#FF9149" />
          <Text
            style={[(styles.footerButtonText, styles.activeFooterButtonText)]}
            color="#FF9149"
          >
            Prizes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#60B5FF",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  headerText: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
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
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // translucent dark blue
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50, // makes it pill-shaped
    paddingVertical: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  diamondIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  amountText: {
    color: "white",
    fontSize: 10,
    fontFamily: "Mochi",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontFamily: "Poppins",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    backgroundColor: "#60B5FF",
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  footerButton: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeFooterButton: {
    // Active state styling
  },
  footerButtonText: {
    fontFamily: "Poppins",
    fontSize: 12,
    marginTop: 5,
  },
  activeFooterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
