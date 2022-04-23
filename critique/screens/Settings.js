import { React, Component } from "react";
import { View, Button, Text, Alert, StyleSheet } from "react-native";
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
    if (this.state.username == null) {
      if (this.state.nav.navigation.getParent().getState().routes.length > 1) {
        await this.setState({
          username: this.state.nav.navigation.getParent().getState().routes[1]
            .params.user,
        });
        console.log(this.state.username);
      }
    }
  }
  async componentDidMount() {
    if (this.state.username == null) {
      if (this.state.nav.navigation.getParent().getState().routes.length > 1) {
        await this.setState({
          username: this.state.nav.navigation.getParent().getState().routes[1]
            .params.user,
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.heading}>Settings</Text>
        </View>
        <View style={styles.body}>
          <Button title="Reset Ratings" onPress={() => this.resetRatings()} />
          <Button
            title="Change Password"
            onPress={() =>
              this.state.nav.navigation.navigate("Change Password", {
                params: {
                  user: this.state.username,
                },
              })
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  main: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    color: "white",
  },
  body: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
});
