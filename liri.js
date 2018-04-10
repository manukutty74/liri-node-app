require("dotenv").config();
const key=require("./keys.js");
const fs = require("fs");

//console.log(key);


 // get the commands from process.argv and manuipulate.
 
  var myCmd = process.argv[2];
  var myArg = '';
  var myArg1 = [];
  
  for (var i = 3; i < process.argv.length; i++) {
  
   myArg = myArg + " " + process.argv[i];

  }
  
  console.log("Liri Says this is ur command :" + myCmd);
  console.log("Liri Says this is the song / movie : "+ myArg);


 switch(myCmd) {
    case "twitter" :
         myTwitter(myArg); 
        break;

    case "spotify-this-song":
          mySpotify(myArg);
        break;

	  case "movie-this":
          myMovie(myArg);
        break;

    case "do-what-it-says":

         
      fs.readFile('./random.txt','utf8', function(err, data) {
       if (err) 
        {console.log("error reading radom.txt file");
        }
        else
       {
       tempCmd = data.split(",");
      
       myCmd = tempCmd[0];
       myArg = tempCmd[1];

       console.log(myCmd);
       console.log(myArg);


     minifx();



       }
     });
    
       

         
          break;

    default:
        console.log("Please provide any of the valid command"); 
        break;       
  }   



// This is the call to Twitter function

 function myTwitter(myArg)
  {

        var Twit = require('twitter');
		var T = new Twit(key.twitter);

        var searchStr = myArg;
        if (!searchStr)
        	{ searchStr = 'nasa'; 
        	}

		var params = {
		q: searchStr,
		count: 5
		}


		T.get('search/tweets', params,searchedData);

		function searchedData(err, data, response) {
			//
			 console.log(data);

            for(var i=0;i<data.statuses.length;i++)
            {
                console.log("Created  At  : "+ i  +   " : "+ data.statuses[i].created_at);
                console.log("Twitter  Id  : "+ i  +   " : "+ data.statuses[i].id);
            	  console.log("Twitter Text : "+ i  +   " : "  + data.statuses[i].text);
            }
            
	   }

} // end of fx
 


// This is the call to Spotify function

function mySpotify(myArg)
{
		var Spotify = require('node-spotify-api');
		var spotify = new Spotify(key.spotify);
		var mySong = myArg
		if (!mySong)
		 { 
		 	mySong = 'The Sign';
		 } 


		spotify.search({ type: 'track', query: mySong ,limit:1 }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred from Spotify Ajax call : ' + err);
		  }
		  // debugger;
		   //console.log(JSON.stringify(data,null,2)); 
		       console.log("Song Name  :" + data.tracks.items[0].name);
           console.log("Album Name :" + data.tracks.items[0].album.name);
           console.log("Preview Url:" + data.tracks.items[0].preview_url);
           console.log("Artist     :" + data.tracks.items[0].artists[0].name);


		});

} // end of fx


function myMovie(myArg)

   {
		// This is the call to Movie OMD function.

		var movieName = myArg;
		if(!movieName)
		  {
		   movieName = "Mr. Nobody"
		  } 

		var request = require("request");

		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
		request(queryUrl,function(error,response,body)
		 {

		console.log(queryUrl);
		if (!error && response.statusCode===200)
		{

		 var movieDetails = (JSON.parse(body)); 

		 console.log("Movie Title :" + movieDetails.Title);
		 console.log("Release Year:" + movieDetails.Year);
		 console.log("imbd Rating :" + movieDetails.imdbRating);
		 console.log("Rating      :" + movieDetails.Ratings);
		 console.log("Country     :" + movieDetails.Country);
		 console.log("Language    :" + movieDetails.Language);
		 console.log("Plot        :" + movieDetails.Plot);
		 console.log("Actors      :" + movieDetails.Actors);

		} 
		});

    } // end of fx


function minifx(){


switch(myCmd) {
    case "twitter" :
         myTwitter(myArg); 
        break;

    case "spotify-this-song":
          mySpotify(myArg);
        break;

    case "movie-this":
          myMovie(myArg);
        break;

    default:
       console.log("Please provide any of the  valid command"); 
    }  

} //end of fx
