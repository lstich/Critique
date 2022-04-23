import { React, Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  card: {
    paddingRight: 50,
  },
});

export default class AlbumListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {
        title: this.props.title,
        artist: this.props.artist,
        cover: this.props.cover,
        rating: this.props.rating,
      },
    };
  }

  componentDidMount() {
    //console.log(this.state.album.title);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: this.state.album.cover }}
        />
        <View style={{ flex: 0.7 }}>
          <Text
            style={{
              flex: 0.3,
              paddingLeft: 5,
              fontSize: 20,
              color: "white",
            }}
          >
            {this.state.album.title}
          </Text>
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 20,
              flex: 0.7,
              color: "#D5DC00",
            }}
          >
            {this.state.album.artist}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            flexDirection: "row",
            flex: 0.35,
            backgroundColor:
              this.state.album.rating < 20
                ? "red"
                : this.state.album.rating < 40
                ? "orange"
                : this.state.album.rating < 60
                ? "#D5DC00"
                : this.state.album.rating < 80
                ? "lightgreen"
                : "green",
          }}
        >
          <Text
            style={{
              flex: 0.6,
              fontSize: 18,
              paddingLeft: 10,
              paddingRight: 5,
              fontWeight: "700",
              justifyContent: "center",
              textAlignVertical: "bottom",

              color:
                (this.state.album.rating < 60) & (this.state.album.rating > 40)
                  ? "black"
                  : "white",
            }}
          >
            {this.state.album.rating}%
          </Text>
          <MaterialIcons
            style={{
              flex: 0.4,
            }}
            name="thumb-up-off-alt"
            color={
              (this.state.album.rating < 60) & (this.state.album.rating > 40)
                ? "black"
                : "white"
            }
            size={34}
          />
        </View>
      </View>
    );
  }
}
