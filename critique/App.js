import { StyleSheet, LogBox } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Albums from "./screens/Albums.js";
import Settings from "./screens/Settings.js";
import Swipe from "./screens/Swipe.js";
import Login from "./screens/Login.js";
import Screen from "./screens/screen.js";
import albumScreen from "./screens/albumScreen.js";
import settingScreen from "./screens/settingScreen.js";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

LogBox.ignoreAllLogs();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.state = {
      userLoggedIn: null,
    };
  }

  async setActiveUser() {
    try {
      let user = "me";
      //this.setState({ userLoggedIn: user });
      //console.log("yeet " + this.state.userLoggedIn);
      console.log(user);

      await AsyncStorage.setItem("activeUser", user);
      this.setState({ userLoggedIn: user });
    } catch (e) {
      // error reading value
    }
  }

  async componentDidUpdate() {
    console.log("update");

    if ((await AsyncStorage.getItem("activeUser")) != null) {
      this.setState({ userLoggedIn: await AsyncStorage.getItem("activeUser") });
      console.log("you made it" + (await AsyncStorage.getItem("activeUser")));
    }
  }

  async componentWillUnmount() {
    AsyncStorage.clear();
  }
  async componentDidMount() {
    //this.setActiveUser();
    let value = await AsyncStorage.getItem("activeUser");
    console.log("mmmmm k " + value);
  }

  render() {
    return (
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator initialRouteName="Swipe">
          <Stack.Screen
            name="Login"
            component={Login}
            //children={() => <Login action={this.setActiveUser} />}
            options={{
              headerShown: false,
              tabBarLabel: "Login",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="star" color={color} size={26} />
              ),
            }}
          />
          <Stack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function AppTabs() {
  return (
    <Tab.Navigator initialRouteName="Swipe">
      <Tab.Screen
        name="Albums"
        component={albumScreen}
        options={{
          tabBarLabel: "Albums",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="album" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Swipe"
        component={Swipe}
        options={{
          tabBarLabel: "Swipe",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="swipe" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={settingScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
