import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image as RNImage,
  Modal,
  Animated,
  Dimensions,
  BackHandler,
  Alert,
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

  const currRoute = 1;

  const characterImages = {
    pink: require("../assets/animations/jump_pink.gif"),
    dino: require("../assets/animations/jump_dino.gif"),
    owl: require("../assets/animations/jump_owl.gif"),
  };

  const handleMenuPress = () => {
    if (isMenuOpen) {
      // Close menu - slide out to left
      Animated.timing(slideAnim, {
        toValue: -290,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsMenuOpen(false));
    } else {
      // Open menu - slide in from left
      setIsMenuOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-290))[0];

  const handleNameEntry = () => {
    //for backend go Vik!
    console.log("Name entered:", name);
    navigation.navigate("RoleSelect");
  };

  // Handle back button press
  useEffect(() => {
    const backAction = () => {
      setIsExitDialogOpen(true);
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  const handleExitDialogClose = () => {
    setIsExitDialogOpen(false);
  };

  return (
    <ImageBackground
      source={require("../assets/backgrounds/page.png")}
      style={styles.background}
      resizeMode="cover"
    >
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
          <View style={styles.readTextSpacing} />
        </View>
        <TouchableOpacity style={styles.bookCard}>
          <RNImage source={{ uri: currBook.cover }} style={styles.bookImage} />
          <Text style={styles.bookTitle}>{currBook.title}</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.footerButton, styles.activeFooterButton]}
            onPress={() => {}}
          >
            <Ionicons
              name="library-outline"
              size={24}
              color={currRoute === 1 ? "#FF9149" : "#fff"}
            />
            <Text
              style={[styles.footerButtonText, styles.activeFooterButtonText]}
            >
              Library
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate("Prizes")}
          >
            <Ionicons
              name="diamond-outline"
              size={24}
              color={currRoute === 0 ? "#FF9149" : "#fff"}
            />
            <Text style={styles.footerButtonText} color="#FF9149">
              Prizes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Menu Modal */}
        <Modal
          visible={isMenuOpen}
          transparent={true}
          animationType="none"
          onRequestClose={() => handleMenuPress()}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.modalBackground}
              activeOpacity={1}
              onPress={() => handleMenuPress()}
            />
            <Animated.View
              style={[
                styles.menuContainer,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              <View style={styles.titleSection}>
                <Text style={styles.menuTitle}>ELLA</Text>
                <Text style={styles.menuSubtitle}>Your English Buddy</Text>
              </View>

              <View style={styles.spacing} />

              <View style={styles.horizontalLine} />

              <TouchableOpacity
                style={[styles.userSection, { paddingHorizontal: 20 }]}
                onPress={() => {
                  // User settings logic will be added later
                  console.log("User settings pressed");
                }}
              >
                <View style={styles.userSettings}>
                  <Image
                    source={characterImages[currUser.character]}
                    style={styles.userAvatar}
                  />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{currUser.name}</Text>
                  <Text style={styles.userRole}>{currUser.role}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.horizontalLine} />

              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                  console.log("Settings pressed");
                }}
              >
                <Ionicons name="settings-outline" size={24} color="#333" />
                <Text style={styles.menuButtonText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                  console.log("Enroll to class pressed");
                }}
              >
                <Ionicons name="add-circle-outline" size={24} color="#333" />
                <Text style={styles.menuButtonText}>Enroll to class</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                  console.log("Contact us pressed");
                }}
              >
                <Ionicons name="chatbubble-outline" size={24} color="#333" />
                <Text style={styles.menuButtonText}>Contact us</Text>
              </TouchableOpacity>

              <View style={styles.horizontalLine} />

              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                  console.log("About ELLA pressed");
                }}
              >
                <Ionicons name="people-outline" size={24} color="#333" />
                <Text style={styles.menuButtonText}>About ELLA</Text>
              </TouchableOpacity>

              <View style={styles.exitButtonContainer}>
                <TouchableOpacity
                  style={styles.exitButton}
                  onPress={() => setIsExitDialogOpen(true)}
                >
                  <Ionicons name="exit-outline" size={16} color="#fff" />
                  <Text style={styles.exitButtonText}>Exit</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </Modal>

        {/* Exit Confirmation Dialog */}
        <Modal
          visible={isExitDialogOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={handleExitDialogClose}
        >
          <View style={styles.exitDialogOverlay}>
            <View style={styles.exitDialogContainer}>
              <Text style={styles.exitDialogTitle}>Stop Reading?</Text>

              <View style={styles.exitDialogButtons}>
                <TouchableOpacity
                  style={styles.exitDialogButtonYes}
                  onPress={handleExitApp}
                >
                  <Ionicons name="checkmark" size={20} color="#fff" />
                  <Text style={styles.exitDialogButtonText}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.exitDialogButtonNo}
                  onPress={handleExitDialogClose}
                >
                  <Ionicons name="close" size={20} color="#fff" />
                  <Text style={styles.exitDialogButtonText} color="#fff">
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
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
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(96, 181, 255, 0.85)", // optional blue overlay for readability
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
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
  readTextSpacing: {
    height: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
  },
  modalBackground: {
    flex: 1,
  },
  menuContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 290,
    height: "100%",
    backgroundColor: "white",
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleSection: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  menuTitle: {
    fontFamily: "PixelifySans",
    fontSize: 48,
    color: "#FF9149",
    textAlign: "center",
    marginBottom: 8,
  },
  menuSubtitle: {
    fontFamily: "PixelifySans",
    fontSize: 14,
    color: "#FF9149",
    textAlign: "center",
    marginBottom: 20,
  },
  spacing: {
    height: 30,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "#ddd",
    width: "100%",
    marginVertical: 15,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  userSettings: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 25,
    marginLeft: 0,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#fff",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#000",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: "Poppins",
    fontSize: 19,
    color: "#333",
    fontWeight: "bold",
  },
  userRole: {
    fontFamily: "Poppins",
    fontSize: 11,
    color: "#666",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "100%",
  },
  menuButtonText: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
    fontWeight: "bold",
  },
  exitButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  exitButton: {
    backgroundColor: "#FF9149",
    width: 64,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  exitButtonText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "PixelifySans",
    fontWeight: "bold",
    marginLeft: 4,
  },
  exitDialogOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  exitDialogContainer: {
    backgroundColor: "#FF9149",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exitDialogTitle: {
    fontFamily: "PixelifySans",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  exitDialogButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  exitDialogButtonYes: {
    backgroundColor: "#FF4444",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 80,
    justifyContent: "center",
  },
  exitDialogButtonNo: {
    backgroundColor: "#4444FF",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 80,
    justifyContent: "center",
  },
  exitDialogButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "PixelifySans",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
