import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function App() {
  const [fontsLoaded] = useFonts({
    PixelifySans: require("./assets/fonts/PixelifySans-Regular.ttf"),
    PixelifySansBold: require("./assets/fonts/PixelifySans-Bold.ttf"),
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // ---
  const handleEmailSignIn = () => {
    // TODO: Add email sign-in gagawin ni Vik
    console.log("Email Sign");
  };

  const handleGoogleSignIn = () => {
    // TODO: Add Google sign-in
    console.log("Google Sign");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ELLA</Text>
      <Text style={styles.subTitle}>Your English Buddy</Text>
      <Image
        source={require("./assets/animations/jump_pink.gif")}
        style={styles.gif}
        contentFit="fill"
        transition={0}
      />
      <Text style={styles.welcome}>Welcome!</Text>

      <TouchableOpacity style={styles.buttonEmail} onPress={handleEmailSignIn}>
        <Ionicons name="mail" style={styles.iconEmail} />
        <Text style={styles.buttonText}>Sign in with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonGoogle}
        onPress={handleGoogleSignIn}
      >
        <Image
          style={styles.iconGoogle}
          source={require("./assets/icons/google.png")}
        />
        <Text style={[styles.buttonText, styles.google]}>
          Sign in with Google
        </Text>
      </TouchableOpacity>
      <View style={styles.signUp}>
        <Text style={styles.signUpText}>No Account? </Text>
        <TouchableOpacity>
          <Text style={[styles.signUpText, styles.signUpTextUnderline]}>
            Sign Up!
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
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
  title: {
    fontFamily: "PixelifySans",
    fontSize: 96,
    color: "#fff",
  },
  gif: {
    width: 190,
    height: 190,
    margin: 30,
  },
  subTitle: {
    fontFamily: "PixelifySans",
    fontSize: 24,
    color: "#fff",
  },
  welcome: {
    fontFamily: "PixelifySans",
    fontSize: 64,
    color: "#fff",
  },
  buttonEmail: {
    flexDirection: "row",
    backgroundColor: "#FF9149",
    width: 250,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
  iconEmail: {
    marginRight: 10,
    fontSize: 32,
    color: "#FFF",
  },
  buttonGoogle: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: 250,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FF9149",
  },
  iconGoogle: {
    marginRight: 10,
    width: 32,
    height: 32,
  },
  buttonText: {
    fontFamily: "Poppins",
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
  },
  google: {
    color: "#000",
  },
  signUp: {
    flexDirection: "row",
  },
  signUpText: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#FFF",
    marginTop: 20,
  },
  signUpTextUnderline: {
    textDecorationLine: "underline",
  },
});
