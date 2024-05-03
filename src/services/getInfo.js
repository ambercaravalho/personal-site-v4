// function to fetch Spotify data from Last.fm API.

export const getInfo = async () => {
  try {
    // Last.fm API URL
    const response = await fetch(
      "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=AmberIsWayward&api_key=5c8a423522ff4a475f65a0f267981c69&format=json"
    );

    // check if response returned an error
    if (!response.ok) {
      throw new Error("Error getting Spotify data from Last.fm API");
    }

    // parse JSON
    const data = await response.json();
    
    // get the most recent track
    const recentTrack = data.recenttracks.track[0]; 

    // get the largest album art URL
    let largestAlbumArtUrl = "";
    if (recentTrack.image && recentTrack.image.length > 0) {
      largestAlbumArtUrl = recentTrack.image[recentTrack.image.length - 1]["#text"] || "";
    }

    // extract song and artist URLs if available
    let songUrl = "";
    let artistUrl = "";

    if (recentTrack.url) {
      // if the song has a URL, use it
      songUrl = recentTrack.url;
    }

    if (recentTrack.artist.url) {
      // if the artist has a URL property, use it
      artistUrl = recentTrack.artist.url;
    } else {
      // if the artist name has a URL-encoded format, construct the Last.fm artist URL
      const encodedArtistName = encodeURIComponent(recentTrack.artist["#text"]);
      artistUrl = `https://www.last.fm/music/${encodedArtistName}`;
    }

    // determine whether the user is currently listening
    const nowPlaying = recentTrack["@attr"] && recentTrack["@attr"].nowplaying === "true";

    // normalize the data
    const normalizedData = {
      data: {
        spotify: {
          song: recentTrack.name || "Unknown",
          artist: recentTrack.artist["#text"] || "Unknown",
          album_art_url: largestAlbumArtUrl,
          songUrl: songUrl,
          artistUrl: artistUrl,
          nowPlaying: nowPlaying.toString()
        }
      }
    };

    return normalizedData;

  } catch (error) {
    console.error("Spotify Data Fetch Error Details: ", error);
    throw error;
  }
};
