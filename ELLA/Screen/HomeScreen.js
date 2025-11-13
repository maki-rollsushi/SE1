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
import { Students, books } from "../Data/data";
import { ImageBackground } from "react-native";
import Sidebar from "../components/Sidebar";
import { getRecommendedBooks } from "../libUtil";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    PixelifySans: require("../assets/fonts/PixelifySans-Regular.ttf"),
    PixelifySansBold: require("../assets/fonts/PixelifySans-Bold.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    Mochi: require("../assets/fonts/MochiyPopOne.ttf"),
  });

  const currUser = Students[0];
  const currBook = books[0];

  const { recommended, teacherMaterials, studentUploads, appBooks } =
    getRecommendedBooks(currUser);

  console.log("Recommended:", recommended);
  console.log("Teacher Materials:", teacherMaterials);
  console.log("Student Uploads:", studentUploads);
  console.log("App Books:", appBooks);

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

        <Sidebar
          isMenuOpen={isMenuOpen}
          slideAnim={slideAnim}
          handleMenuPress={handleMenuPress}
          currUser={currUser}
          characterImages={characterImages}
          setIsExitDialogOpen={setIsExitDialogOpen}
        />

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
