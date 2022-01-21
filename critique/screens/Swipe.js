import { React, Component } from "react";
import { View, Button, Text } from "react-native";

export default class Swipe extends Component {
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <Text style={{ color: "white" }}>Swipe Screen</Text>
      </View>
    );
  }
}
