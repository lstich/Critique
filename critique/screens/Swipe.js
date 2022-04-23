import { React, Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Image,
  Button,
} from "react-native";
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
      spinner: true,
      allCardsSwiped: false,
      index: 0,
    };
  }
  componentDidUpdate() {
    if (this.state.username == null) {
      this.setState({ username: this.state.nav.route.params.user });
      console.log(this.state.nav.route.params.user);
    }
  }

  async componentDidMount() {
    if (this.state.username == null) {
      await this.setState({ username: this.state.nav.route.params.user });
      this.state.nav.navigation.setParams({
        user: this.state.nav.route.params.user,
      });
    }
    this.fetchAlbums();
  }

  fetchAlbums() {
    try {
      axios
        .post(`https://critique-heroku.herokuapp.com/albums/getNewAlbums`, {
          username: this.state.username,
        })
        .then((res) => {
          if (res) {
            //console.log(this.state.username == "q");

            this.setState({
              albums: res.data.albums,
            });
            this.setState({ spinner: false });
          }
        });
      console.log(Object.values(this.state.albums));
    } catch (err) {
      console.log(err);
    }
  }

  swipeApi(albumId, rating) {
    try {
      axios
        .post(`https://critique-heroku.herokuapp.com/albums/userRateAlbum`, {
          username: this.state.username,
          albumId: albumId,
          userRating: rating,
        })
        .then(async function (res) {
          if (res) {
            //console.log(res);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.flexstyle}>
        {this.state.spinner ? (
          <ActivityIndicator
            style={styles.spinner}
            visible={this.state.spinner}
            size="large"
            color="#ffffff"
          />
        ) : (
          <>
            {this.state.allCardsSwiped ||
            this.state.index >= this.state.albums.length ||
            this.state.albums.length < 1 ? (
              <View style={styles.flexstyle}>
                <Text style={styles.text}>All albums rated!</Text>
              </View>
            ) : (
              <>
                {Platform.OS === "ios" ? (
                  <View style={styles.container}>
                    <Swiper
                      useViewOverflow={Platform.OS === "ios"}
                      cards={this.state.albums.map((album) => {
                        return (
                          <AlbumTileCard
                            title={album.title}
                            artist={album.artist}
                            cover={album.cover}
                            rating={album.rating}
                          />
                        );
                      })}
                      onSwipedLeft={(cardIndex) => {
                        console.log(cardIndex);
                        if (cardIndex < this.state.albums.length) {
                          this.swipeApi(
                            this.state.albums[cardIndex].albumId,
                            0
                          );
                        } else {
                          this.setState({ allCardsSwiped: true });
                        }
                      }}
                      onSwipedRight={(cardIndex) => {
                        if (cardIndex < this.state.albums.length) {
                          this.swipeApi(
                            this.state.albums[cardIndex].albumId,
                            1
                          );
                        } else {
                          this.setState({ allCardsSwiped: true });
                        }
                      }}
                      onSwipedTop={(cardIndex) => {}}
                      renderCard={(card) => {
                        if (!card && this.state.spinner == false) {
                          //this.setState({ allCardsSwiped: true });
                        }
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
                        this.setState({ allCardsSwiped: true });
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
                      infinite={false}
                      containerStyle={styles.container}
                    ></Swiper>
                  </View>
                ) : (
                  <View style={styles.viewStyle}>
                    <Image
                      style={styles.imageAndroid}
                      source={{
                        uri: this.state.albums[this.state.index].cover,
                      }}
                    />
                    <View style={styles.androidView}>
                      <Text style={styles.androidText}>
                        {this.state.albums[this.state.index].title}
                      </Text>
                      <Text style={styles.androidSecondaryText}>
                        {this.state.albums[this.state.index].artist}
                      </Text>
                      <View style={styles.androidTextView}>
                        <View style={{ marginTop: 5, marginHorizontal: 30 }}>
                          <Button
                            color="red"
                            title="Dislike"
                            onPress={(press) => {
                              this.swipeApi(
                                this.state.albums[this.state.index].albumId,
                                0
                              );
                              this.setState({ index: this.state.index + 1 });
                            }}
                          >
                            {" "}
                          </Button>
                        </View>
                        <View style={{ marginHorizontal: 30 }}>
                          <Button
                            color="green"
                            title="Like"
                            onPress={(press) => {
                              this.swipeApi(
                                this.state.albums[this.state.index].albumId,
                                1
                              );
                              this.setState({ index: this.state.index + 1 });
                            }}
                          >
                            {" "}
                          </Button>
                        </View>
                      </View>
                      <View style={{ marginVertical: 10 }}>
                        <Button
                          color="blue"
                          title="Don't know"
                          onPress={(press) => {
                            this.setState({ index: this.state.index + 1 });
                          }}
                        >
                          {" "}
                        </Button>
                      </View>
                    </View>
                  </View>
                )}
              </>
            )}
          </>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  androidView: {
    flex: 0.5,
    alignItems: "center",
  },
  androidText: {
    flex: 1,
    fontSize: 24,
    color: "white",
  },
  androidSecondaryText: {
    fontSize: 24,
    flex: 0.5,
    color: "#D5DC00",
  },
  androidTextView: {
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    position: "absolute",
    textAlign: "center",
    bottom: 700,
  },
  flexstyle: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 24,
    flex: 1,
    paddingTop: 100,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
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
  imageAndroid: {
    aspectRatio: 1,
    flex: 0.1,
    borderRadius: 100,
    borderWidth: 100,
  },
  viewStyle: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
  },
});
