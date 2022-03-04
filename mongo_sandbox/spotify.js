let mongoose = require("./../db/mongoose");
let Album = require("./../schema/Album.model.js");

const SpotifyWebApi = require("spotify-web-api-node");
const spotify = require("spotify-web-api-node");

// application requests authorization

let spotifyApi = new SpotifyWebApi({
  clientId: "a74d9e22563f472f94b33b083bec7a21",
  clientSecret: "6b04cdfa5d844178abfdf50939545cac",
  redirectUri: "http://localhost:8888/callback",
});

let authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(
        spotifyApi.clientId + ":" + spotifyApi.client_secret
      ).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};
let token =
  "BQBK1WBo_AXzGSkhrhnTu6IKXiqye9SdHmIqk36gRyDKIQh4piV7XWhOurv4hBGj4wRmbe4ydYp62OzLr1fNzqQBk4ZgKfBe6BK11cHarfMx-P8CdLbE4z-cHbdSfhxl2ZF9MUlP_654Jx8OBW2UHI6pmnyh6Tt6SqO48kxXBg";
spotifyApi.setAccessToken(token);

addAlbumsToDB();

function addAlbumsToDB() {
  (async () => {
    let offset = -50;
    let next = false;

    do {
      offset += 50;
      let options = {
        limit: 50,
        offset: offset + 50,
      };
      let albums = await spotifyApi.getNewReleases(options);
      console.log(albums.body.albums.items);
      for (let i = 0; i < albums.body.albums.items.length; i++) {
        //console.log(albums.body.items[i].album);
        let title = albums.body.albums.items[i].name;
        let artist = albums.body.albums.items[i].artists[0].name;
        let art = albums.body.albums.items[i].images[1].url;
        let id = albums.body.albums.items[i].id;
        /*
        variables for getMySavedAlbums
        let title = albums.body.items[i].album.name;
        let artist = albums.body.items[i].album.artists[0].name;
        let art = albums.body.items[i].album.images[1].url;
        let id = albums.body.items[i].album.id;
        */
        console.log(title);
        console.log(artist);
        console.log(art);
        console.log(id);

        if (id == null) return;

        let newAlbum = new Album({
          albumId: id,
          title: title,
          artist: artist,
          cover: art,
          userRatings: [null],
        });

        Album.findOne({ albumId: id }).then(
          (albums) => {
            if (albums == null) {
              newAlbum.save().then(
                (doc) => {
                  console.log("added album! ", title);
                  res.send({ albums });
                },
                (err) => {
                  res.status(400).send(err);
                }
              ),
                (err) => {
                  res.status(400).send(err);
                };
            } else {
              //res.send("album already exists");
            }
          },
          (err) => {
            res.status(400).send(err);
          }
        );
      }

      if (albums.body.next) {
        next = true;
      } else {
        next = false;
      }
    } while (next);
    console.log("hello");
  })().catch((e) => {
    console.error(e);
  });
}

//console.log(token);

//request.post(authOptions, function(error, response, body) {
//if (!error && response.statusCode === 200) {

// use the access token to access the Spotify Web API
/*let token = body.access_token;
    let options = {
    url: 'https://api.spotify.com/v1/me/albums',
    limit: 10,
    offset: 5,
    headers: {
        'Authorization': 'Bearer ' + token
    },
    json: true
    };
    
    if (token == null) return;
    
    request.get(options, function(error, response, body) {
        //console.log(token);
        console.log(response);
    });
    //}
    // });
    
    */
