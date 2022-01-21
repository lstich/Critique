import { React, Component } from "react";
import { View, Button, Text } from "react-native";
import Colours from "../components/styles.js";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <View
        style={{
          flex: 1,

          marginTop: 80,
        }}
      >
        <View
          style={{
            flex: 0.1,
            alignItems: "Left",
            justifyContent: "Left",
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>Settings Screen</Text>
        </View>
        <View
          style={{
            flex: 0.9,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            title="Reset Ratings"
            onPress={() => navigation.navigate("Settings")}
          />
          <Button
            title="Change Password"
            onPress={() => navigation.navigate("Settings")}
          />
          <Button
            title="Logout"
            onPress={() => navigation.navigate("Settings")}
          />
        </View>
      </View>
    );
  }
}
