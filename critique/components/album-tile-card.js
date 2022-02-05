import { React, Component } from "react";
import { View, Text, Image } from "react-native";

export default class AlbumTileCard extends Component {
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

  componentDidMount() {}

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 3,
          flexShrink: 1,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            aspectRatio: 1,
            flex: 1,
            borderRadius: 4,
            borderWidth: 2,
          }}
          source={{ uri: this.state.album.cover }}
        />
        <View
          style={{
            flex: 0.35,
            flexShrink: 1,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              flex: 1,
              paddingLeft: 5,
              fontSize: 24,
              color: "white",
              flexShrink: 1,
              flexWrap: "wrap",
            }}
          >
            {this.state.album.title}
          </Text>
          <Text
            style={{
              paddingLeft: 5,
              fontSize: 24,
              flex: 1,
              color: "#D5DC00",
              flexWrap: "wrap",
              flexShrink: 1,
            }}
          >
            {this.state.album.artist}
          </Text>
        </View>
      </View>
    );
  }
}
