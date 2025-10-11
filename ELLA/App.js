import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartUp from "./Screen/StartUp";
import SignUp from "./Screen/SignUp";
import NameEntry from "./Screen/NameEntry";
import RoleSelect from "./Screen/roleSelect";
import HomeScreen from "./Screen/HomeScreen";
import Prizes from "./Screen/Prizes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartUp"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="StartUp" component={StartUp} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="NameEntry" component={NameEntry} />
        <Stack.Screen name="RoleSelect" component={RoleSelect} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Prizes" component={Prizes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
