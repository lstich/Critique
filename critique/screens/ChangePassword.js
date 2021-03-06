import { React, Component } from "react";
import { View, Button, Text, TextInput, StyleSheet, Alert } from "react-native";
import axios from "axios";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = { nav: props, username: null, oldPass: null, newPass: null };
  }

  handleOldPassChange = (value) => {
    this.setState({ oldPass: value });
  };

  handleNewPassChange = (value) => {
    this.setState({ newPass: value });
    console.log(this.state.oldPass);
    console.log(this.state.newPass);
    console.log(this.state.username);
  };

  changePassword() {
    console.log(this.state.oldPass);
    console.log(this.state.newPass);
    console.log(this.state.username);
    try {
      axios
        .post(`https://critique-heroku.herokuapp.com/users/changePassword`, {
          username: this.state.username,
          oldPassword: this.state.oldPass,
          newPassword: this.state.newPass,
        })
        .then(async function (res) {
          if (res) {
            console.log(res.data);
            Alert.alert("Password Successfully Changed!", "", [
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
          }
        })
        .catch((err) => {
          Alert.alert("Incorrect old password!", "", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate() {}

  async componentDidMount() {
    if (this.state.username == null) {
      await this.setState({
        username: this.state.nav.route.params.params.user,
      });
      console.log(this.state.username);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Old Password:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter old password"
            ref={(input) => {
              this.userInput = input;
            }}
            returnKeyType="next"
            //onSubmitEditing=
            onChangeText={(value) => this.handleOldPassChange(value)}
          ></TextInput>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>New Password:</Text>
          <TextInput
            style={styles.textInput}
            clearTextOnFocus
            ref={(input) => {
              this.passwordInput = input;
            }}
            returnKeyType="go"
            placeholder="Enter new password"
            secureTextEntry={true}
            onChangeText={(value) => this.handleNewPassChange(value)}
          ></TextInput>
        </View>
        <View style={styles.buttons}>
          <Button
            title="Update Password"
            onPress={(value) => {
              value.preventDefault();
              this.changePassword();
            }}
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
  text: {
    color: "white",
    fontFamily: "Arial",
    paddingBottom: 5,
    marginHorizontal: 5,
  },
  textInput: {
    color: "black",
    fontFamily: "Arial",
    padding: 10,
    marginHorizontal: 5,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
  },
  infoBox: {
    flexDirection: "column",
    backgroundColor: "#222222",
    margin: 3,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 15,
  },
});
