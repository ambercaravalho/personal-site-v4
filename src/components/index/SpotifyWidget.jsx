// Builds the Spotify widget

import { useState, useEffect } from "preact/hooks";
import { getInfo } from "./getSpotify";

export const SpotifyStatus = () => {
  const [activityData, setActivityData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetches Spotify data from Last.fm API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfo();
        setActivityData(data);
        setIsLoading(false);

      } catch (err) {
        console.error("Spotify Data Fetch Error Details: ", err);
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Refreshes data every 5 minutes
    const interval = setInterval(fetchData, 300000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Determine whether the user is currently listening or recently listened
  const isListeningNow = activityData?.data?.spotify?.nowPlaying === "true";

  // Displays generic album cover and text if loading
  if (isLoading) {
    return (
      <>
        <p class="text-[#ffffff] font-bold text-xs lg:text-3xl md:text-xl">Loading...</p>
        <img loading="lazy" class="absolute w-full h-full top-0 left-0 object-center object-cover z-[-1]" src="../assets/spotify-generic.jpeg" alt="Generic Spotify Album Cover"></img>
      </>
    );
  }

  // Displays Spotify data if available
  return (
    <div class="flex flex-col">
        <div class="flex flex-col gap-4">
          <p class="text-[#ffffff] font-bold text-3xl">
            {isListeningNow
            ? "Listening Now 🎧"
            : "Recently Played 🎛️"}
          </p>
          <a href={activityData?.data?.spotify?.songUrl} target="_blank" rel="noopener noreferrer" class="text-[#ffffff] w-full text-2xl font-semibold truncate">
            {activityData?.data?.spotify.song}
          </a>
        </div>
        <div>
          <a href={activityData?.data?.spotify?.artistUrl} target="_blank" rel="noopener noreferrer" class="text-[#ffffff] w-full text-2xl truncate">
            {activityData?.data?.spotify.artist}
          </a>
        </div>
      <img
        loading="lazy"
        class="absolute w-full h-full top-0 left-0 object-center object-cover z-[-1]"
        src={
          activityData?.data?.spotify.album_art_url
            ? activityData?.data?.spotify.album_art_url
            : "../assets/spotify-generic.jpeg"
        }
        alt="Spotify Album"
      ></img>
    </div>
  );
};
