import { React, Component } from "react";
import { Button, StyleSheet, View, TextInput, Text, Image } from "react-native";
import axios from "axios";

const styles = StyleSheet.create({
  buttons: {
    flex: 0.2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  logoHeader: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 0.3,
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
  spinner: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleEmailChange = (value) => {
    this.setState({ email: value });
  };

  handlePasswordChange = (value) => {
    this.setState({ password: value });
  };

  handleLogin = async () => {
    try {
      let user = {
        username: this.state.email,
        password: this.state.password,
      };
      console.log(this.state.email + " " + this.state.password);
      axios
        .post(`https://critique-heroku.herokuapp.com/users/login`, {
          username: user.username,
          password: user.password,
        })
        .then(async function (res) {
          if (res) {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  handleRegister = async () => {
    let user = {
      username: this.state.email,
      password: this.state.password,
    };
    console.log("hi");
    try {
      axios
        .post(`https://critique-heroku.herokuapp.com/users/register`, {
          username: user.username,
          password: user.password,
        })
        .then(async function (res) {
          if (res) {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoHeader}>
          <Text
            style={{
              color: "white",
              fontSize: "38",
              fontFamily: "Arial",
              fontWeight: "700",
              paddingBottom: 10,
            }}
          >
            Critique
          </Text>
          <Image
            style={{ height: 100, width: 100 }}
            source={require("./../assets/Critique_Wireframe.jpg")}
          ></Image>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Email:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Email"
            textContentType="emailAddress"
            onChangeText={(value) => this.handleEmailChange(value)}
          ></TextInput>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Password:</Text>
          <TextInput
            style={styles.textInput}
            clearTextOnFocus
            textContentType="password"
            passwordRules
            placeholder="Enter Your Password"
            onChangeText={(value) => this.handlePasswordChange(value)}
          ></TextInput>
        </View>
        <View style={styles.buttons}>
          <Button
            title="Login"
            onPress={(press) => {
              press.preventDefault();
              this.handleLogin();
              console.log(this.state.email + " " + this.state.password);
            }}
          />
          <Button
            title="Register"
            onPress={(press) => {
              press.preventDefault();
              this.handleRegister();
              console.log(this.state.email + " " + this.state.password);
            }}
          />
        </View>
      </View>
    );
  }
}
