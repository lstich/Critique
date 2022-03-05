import { React, Component } from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    color: "white",
    marginTop: 130,
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default class albumScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Albums</Text>
      </View>
    );
  }
}
