  var fs = require("fs"); //reads and writes files
  var request = require("request");
  var keys = require("./keys.js");
  var twitter = require("twitter");
  var spotify = require ('node-spotify-api');
  var string2 = process.argv[2];
//========================================================

  switch(string2) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": random(); break;
    // Instructions displayed in terminal to the user
    default: console.log("\r\n" +"Try typing one of the following commands after 'node liri.js' : " +"\r\n"+
      "1. my-tweets " +"\r\n"+
      "2. spotify-this-song 'song name' "+"\r\n"+
      "3. movie-this 'movie name' "+"\r\n"+
      "4. do-what-it-says"+"\r\n" );
  };

//==========================================================
  function myTweets() {
    var client = new twitter({
      consumer_key: keys.twitterKeys.consumer_key,
      consumer_secret: keys.twitterKeys.consumer_secret,
      access_token_key: keys.twitterKeys.access_token_key,
      access_token_secret: keys.twitterKeys.access_token_secret, 
    });

    var params = {screen_name: 'KukuMal88503669'};
    client.get("statuses/user_timeline/", params, function(error, data, response){
        for(var i = 0; i < data.length; i++) {
          //console.log(response); // Show the full response in the terminal
          var tweets = 
          "@" + data[i].user.screen_name + ": " + 
          data[i].text + "\r\n" + 
          data[i].created_at + "\r\n" + 
          "------------------------------------------------------------" + "\r\n";
          console.log(tweets);
          log(tweets);
      }  if (error) {
        console.log("Error :"+ error);
        return;
      }
    });
  };


//========================================================
  function spotifyThisSong() {
    
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "989d872b87b14988acb1d5904340fb98",
  secret: "9f84fb3d521c46e9a2b425a8d6a9a27c"
});


var song = process.argv[3];

   if (song===undefined) {
   song = "The Sign Ace of Base"
};

spotify.search({ type: 'track', query: song }, function(err, data) {

    var songInfo = data.tracks.items;
    for (var i = 0; i < 3; i++) {
            var songdata =
            "Artist: " + songInfo[i].artists[0].name + "\r\n" +
            "Song: " + songInfo[i].name + "\r\n" +
            "Album: " + songInfo[i].album.name + "\r\n" +
            "URL: " + songInfo[i].preview_url + "\r\n" + 
            "-----------------------------------------------------------" + "\r\n";
            console.log(songdata);
  } if (err) {
    return console.log('Error occurred: ' + err);
  }
 
  });
};

//=============================================================
  function movieThis(){
      var request = require("request");
var movie = process.argv[3];
   if (movie===undefined) {
   movie = "mr.nobody"
};

 request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    var movieInfo = 
        "Title: " + JSON.parse(body).Title+"\r\n"+
        "Year: " + JSON.parse(body).Year+"\r\n"+
        "Imdb Rating: " + JSON.parse(body).imdbRating+"\r\n"+
        "Country: " + JSON.parse(body).Country+"\r\n"+
        "Language: " + JSON.parse(body).Language+"\r\n"+
        "Plot: " + JSON.parse(body).Plot+"\r\n"+
        "Actors: " + JSON.parse(body).Actors+"\r\n"+
        "Rotten Tomatoes URL: " + "https://www.rottentomatoes.com/m/"+ movie +"\r\n";
    console.log(movieInfo);
  }
});
  };

//=====================================================================================
  function random() {
    fs.readFile("random.txt", "utf8", function(error, data){
      if (!error) {
        randomTxt = data.split(",");
        console.log(randomTxt[1]);
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "989d872b87b14988acb1d5904340fb98",
  secret: "9f84fb3d521c46e9a2b425a8d6a9a27c"
});

spotify.search({ type: 'track', query: randomTxt[1] }, function(err, data) {

    var songInfo = data.tracks.items;
    for (var i = 0; i < 3; i++) {
            var songdata =
            "Artist: " + songInfo[i].artists[0].name + "\r\n" +
            "Song: " + songInfo[i].name + "\r\n" +
            "Album: " + songInfo[i].album.name + "\r\n" +
            "URL: " + songInfo[i].preview_url + "\r\n" + 
            "-----------------------------------------------------------" + "\r\n";
            console.log(songdata);
  } if (err) {
    return console.log('Error occurred: ' + err);
  }
 
  });
      } else {
        console.log("Error" + error);
      }
    });
  };
  // Do What It Says function, uses the reads and writes module to access the log.txt file and write everything that returns in terminal in the log.txt file
function log(logResults) {
      fs.appendFile("log.txt", logResults, (error) => {
        if(error) {
          throw error;
        }
      });
    };