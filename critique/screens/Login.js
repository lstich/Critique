import { React, Component } from "react";
import {
  Button,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
//import AsyncStorage from "@react-native-async-storage/async-storage";

//import { withNavigation } from "react-navigation";

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
    flex: 0.35,
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

function Login({ navigation, action }) {
  let email = "";
  let password = "";

  const handleUserChange = (value) => {
    email = value;
  };

  const handlePasswordChange = (value) => {
    password = value;
  };

  const handleLogin = async () => {
    try {
      let user = {
        username: email,
        password: password,
      };
      axios
        .post(`https://critique-heroku.herokuapp.com/users/login`, {
          username: user.username,
          password: user.password,
        })
        .then(async function (res) {
          if (res) {
            console.log(res.data);
            this.userInput.clear();
            this.passwordInput.clear();
            navigation.navigate("AppTabs", {
              screen: "Swipe",
              params: {
                user: user.username,
              },
            });
            //this.setState({ res: res.data, loggedInUser: username });
            //_storeActiveUser(username);

            //this.props.propName(user.username);
            //this.setActive(user.username);
            /*await AsyncStorage.setItem("activeUser", user.username);
            console.log(
              "yeahhh man " + (await AsyncStorage.getItem("activeUser"))
            );*/
          } else {
          }
        })
        .catch((err) => {
          Alert.alert("Username or Password incorrect!", "Please try again", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleRegister = async () => {
    let user = {
      username: email,
      password: password,
    };
    console.log(user);
    console.log(email);
    try {
      axios
        .post(`https://critique-heroku.herokuapp.com/users/register`, {
          username: user.username,
          password: user.password,
        })
        .then(async function (res) {
          if (res) {
            Alert.alert("Account Registered!", "Please log in", [
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);

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

  return (
    <View style={styles.container}>
      <View style={styles.logoHeader}>
        <Text
          style={{
            color: "white",
            fontSize: 38,
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
        <Text style={styles.text}>Username:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Username"
          ref={(input) => {
            this.userInput = input;
          }}
          textContentType="username"
          returnKeyType="next"
          //onSubmitEditing=
          onChangeText={(value) => handleUserChange(value)}
        ></TextInput>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.text}>Password:</Text>
        <TextInput
          style={styles.textInput}
          clearTextOnFocus
          textContentType="password"
          passwordRules
          ref={(input) => {
            this.passwordInput = input;
          }}
          returnKeyType="go"
          placeholder="Enter Your Password"
          secureTextEntry={true}
          onChangeText={(value) => handlePasswordChange(value)}
        ></TextInput>
      </View>
      <View style={styles.buttons}>
        <Button
          title="Login"
          onPress={(press) => {
            press.preventDefault();
            handleLogin();
          }}
        />
        <Button
          title="Register"
          onPress={(press) => {
            press.preventDefault();
            handleRegister();
          }}
        />
      </View>
    </View>
  );
}
export default Login;
