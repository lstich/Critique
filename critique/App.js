import { StyleSheet, LogBox } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { WebView } from "react-native-webview";

import Albums from "./screens/Albums.js";
import Settings from "./screens/Settings.js";
import Swipe from "./screens/Swipe.js";
import Login from "./screens/Login.js";
import ChangePassword from "./screens/ChangePassword.js";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

LogBox.ignoreAllLogs();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: null,
    };
  }

  async componentDidUpdate() {}
  async componentWillUnmount() {}
  async componentDidMount() {}

  render() {
    return (
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              tabBarLabel: "Login",
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
        component={Albums}
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
        component={SettingsStack}
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

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={{}}
      />
    </Stack.Navigator>
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
