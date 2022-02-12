import { React, Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  SafeAreaView,
} from "react-native";
import axios from "axios";

import AlbumListCard from "./../components/album-list-card";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  screen: {
    flex: 1,
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
      spinner: true,
    };
  }

  componentDidMount() {
    this.doApiCall();
  }

  com;
  doApiCall() {
    try {
      axios
        .get(`https://critique-heroku.herokuapp.com/albums/getalbums`)
        .then((res) => {
          if (res) {
            this.setState({ spinner: false });
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
      <SafeAreaView style={styles.screen}>
        {this.state.spinner ? (
          <ActivityIndicator
            style={styles.spinner}
            visible={this.state.spinner}
            size="large"
            color="#ffffff"
          />
        ) : (
          <ScrollView style={styles.screen} ref={(ref) => (this.scroll = ref)}>
            {this.state.albums.map((album) => (
              <View key={album.albumId} style={{ paddingTop: 10 }}>
                <AlbumListCard
                  title={album.title}
                  artist={album.artist}
                  cover={album.cover}
                  rating={album.rating}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}
