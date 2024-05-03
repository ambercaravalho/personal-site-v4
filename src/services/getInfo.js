// Function to fetch Spotify data from Last.fm API and load the largest album art possible.
export const getInfo = async () => {
  try {
    // Last.fm API URL
    const response = await fetch(
      "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=AmberIsWayward&api_key=5c8a423522ff4a475f65a0f267981c69&format=json"
    );

    // Check if response returned an error
    if (!response.ok) {
      throw new Error("Error getting Spotify data from Last.fm API");
    }

    // Parse JSON
    const data = await response.json();
    
    // Extract relevant information from the response
    const recentTrack = data.recenttracks.track[0]; // Get the most recent track

    // Get the largest album art URL
    let largestAlbumArtUrl = "";
    if (recentTrack.image && recentTrack.image.length > 0) {
      largestAlbumArtUrl = recentTrack.image[recentTrack.image.length - 1]["#text"] || "";
    }

    // Extract song and artist URLs if available
    let songUrl = "";
    let artistUrl = "";

    if (recentTrack.url) {
      // If the song has a URL, use it
      songUrl = recentTrack.url;
    }

    if (recentTrack.artist.url) {
      // If the artist has a URL property, use it
      artistUrl = recentTrack.artist.url;
    } else {
      // If the artist name has a URL-encoded format, construct the Last.fm artist URL
      const encodedArtistName = encodeURIComponent(recentTrack.artist["#text"]);
      artistUrl = `https://www.last.fm/music/${encodedArtistName}`;
    }

    // Determine whether the user is currently listening
    const nowPlaying = recentTrack["@attr"] && recentTrack["@attr"].nowplaying === "true";

    // Normalize the data
    const normalizedData = {
      data: {
        spotify: {
          song: recentTrack.name || "Unknown",
          artist: recentTrack.artist["#text"] || "Unknown",
          album_art_url: largestAlbumArtUrl,
          songUrl: songUrl,
          artistUrl: artistUrl,
          nowPlaying: nowPlaying ? "true" : "false" // Set to "false" if not playing
        }
      }
    };

    return normalizedData;

  } catch (error) {
    console.error("Spotify Data Fetch Error Details: ", error);
    throw error;
  }
};
