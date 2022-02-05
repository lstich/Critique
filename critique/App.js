import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { NativeBaseProvider } from "native-base";

import Albums from "./screens/Albums.js";
import Settings from "./screens/Settings.js";
import Swipe from "./screens/Swipe.js";
import Login from "./screens/Login.js";

const Tab = createMaterialBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer theme={DarkTheme}>
        <Tab.Navigator initialRouteName="Albums">
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
            component={Settings}
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="settings" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Login"
            component={Login}
            options={{
              tabBarLabel: "Login",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="login" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
