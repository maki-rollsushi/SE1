import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import StartUp from "./Screen/StartUp";
import SignUp from "./Screen/SignUp";
import NameEntry from "./Screen/NameEntry";
import RoleSelect from "./Screen/roleSelect";
import HomeScreen from "./Screen/HomeScreen";
import AvatarSelect from "./Screen/avatarSelect";
import AvatarName from "./Screen/AvatarName";
import Prizes from "./Screen/Prizes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <NavigationContainer>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#fff" }}
          edges={["top"]}
        >
          <Stack.Navigator
            initialRouteName="StartUp"
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#fff" },
            }}
          >
            <Stack.Screen name="StartUp" component={StartUp} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="NameEntry" component={NameEntry} />
            <Stack.Screen name="RoleSelect" component={RoleSelect} />
            <Stack.Screen name="AvatarSelect" component={AvatarSelect} />
            <Stack.Screen name="AvatarName" component={AvatarName} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Prizes" component={Prizes} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
