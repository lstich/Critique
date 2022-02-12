import { React, Component } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";
import axios from "axios";

import AlbumTileCard from "./../components/album-tile-card";

export default class Swipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: props,
      username: null,
      albums: [],
      borderColour: "black",
      cardColour: "white",
    };
  }
  componentDidUpdate() {
    if (this.state.username == null) {
      this.setState({ username: this.state.nav.route.params.user });
    }
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
      console.log(Object.values(this.state.albums));
    } catch (err) {
      console.log(err);
    }
  }

  swipeGreen() {
    console.log("hahah");
  }

  swipeRed() {}

  swipeBlue() {}

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          cards={this.state.albums.map((album) => {
            return (
              <AlbumTileCard
                title={album.title}
                artist={album.artist}
                cover={album.cover}
                rating="81"
              />
            );
          })}
          onSwipedLeft={(cardIndex) => {
            console.log(cardIndex);
            //this.state.albums[cardIndex].albumId
            this.swipeRed;
          }}
          onSwipedRight={(cardIndex) => {
            this.swipeGreen;
          }}
          onSwipedTop={(cardIndex) => {
            this.swipeBlue;
          }}
          renderCard={(card) => {
            return (
              <View
                style={
                  this.state.cardColour == "blue"
                    ? styles.cardBlue
                    : this.state.cardColour == "green"
                    ? styles.cardGreen
                    : this.state.cardColour == "red"
                    ? styles.cardRed
                    : styles.card
                }
              >
                {card}
              </View>
            );
          }}
          onSwiped={(cardIndex) => {
            //console.log(cardIndex);
            //console.log(this.state.albums[cardIndex]);
            this.setState({ cardColour: "white" });
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          onSwipedAborted={() => {
            this.setState({ cardColour: "white" });
          }}
          onSwiping={(x, y) => {
            if (Math.abs(x) > Math.abs(y)) {
              if (x > 0) {
                this.setState({ cardColour: "green" });
              } else {
                this.setState({ cardColour: "red" });
              }
            } else {
              if (y < 0) {
                this.setState({ cardColour: "blue" });
              } else {
                this.setState({ cardColour: "white" });
              }
            }
          }}
          cardIndex={0}
          backgroundColor={"black"}
          stackSize={2}
          disableBottomSwipe={true}
          containerStyle={styles.container}
        ></Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    position: "absolute",
    textAlign: "center",
    bottom: 700,
  },
  card: {
    flex: 0.6,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#222222",
  },
  cardGreen: {
    flex: 0.6,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "#222222",
  },
  cardRed: {
    flex: 0.6,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "#222222",
  },
  cardBlue: {
    flex: 0.6,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "blue",
    backgroundColor: "#222222",
  },
});
