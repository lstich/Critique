import { React, Component } from "react";
import { View, Button, Text, Alert } from "react-native";
import Colours from "../components/styles.js";
import axios from "axios";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { nav: props, username: null };
  }

  resetRatings = async () => {
    try {
      axios
        .post(`https://critique-heroku.herokuapp.com/albums/resetUserRatings`, {
          username: this.state.username,
        })
        .then(async function (res) {
          if (res) {
            console.log(res.data);
            Alert.alert(
              "Ratings Successfully Reset!",
              "Logout to update swipe stack",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            //Alert.alert("Ratings successfully reset!", [
            //  { text: "OK", onPress: () => console.log("OK Pressed") },
            //]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidUpdate() {
    //console.log(this.state.nav);
    if (this.state.username == null) {
      if (this.state.nav.navigation.getState().routes.length > 1) {
        await this.setState({
          username: this.state.nav.navigation.getState().routes[1].params.user,
        });
        console.log(this.state.username);
      }
    }
  }
  async componentDidMount() {
    //console.log(this.state.nav.navigation.getState().routes[1].params.user);
    if (this.state.username == null) {
      if (this.state.nav.navigation.getState().routes.length > 1) {
        await this.setState({
          username: this.state.nav.navigation.getState().routes[1].params.user,
        });
        console.log(this.state.username);
      }
    }
  }

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
          <Button title="Reset Ratings" onPress={() => this.resetRatings()} />
          <Button
            title="Change Password"
            onPress={() =>
              Alert.prompt(
                "Enter new Password",
                "",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: (password) =>
                      console.log("OK Pressed, password: " + password),
                  },
                ],
                "secure-text"
              )
            }
          />
          <Button
            title="Logout"
            onPress={() => this.state.nav.navigation.navigate("Login")}
          />
        </View>
      </View>
    );
  }
}
