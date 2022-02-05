import { React, Component } from "react";
import { Button, StyleSheet, ScrollView, Pressable } from "react-native";
import axios from "axios";

import AlbumListCard from "./../components/album-list-card";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
    };
  }

  componentDidMount() {
    this.doApiCall();
  }

  doApiCall() {
    try {
      axios
        .get(`https://critique-heroku.herokuapp.com/albums/getalbums`)
        .then((res) => {
          if (res) {
            this.setState({
              albums: res.data.albums,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container} ref={(ref) => (this.scroll = ref)}>
        {this.state.albums.map((album) => (
          <Pressable style={{ paddingTop: 10 }}>
            <AlbumListCard
              title={album.title}
              artist={album.artist}
              cover={album.cover}
              rating="81"
            />
          </Pressable>
        ))}
        <Button title="Go to Details" onPress={() => this.doApiCall()} />
      </ScrollView>
    );
  }
}
