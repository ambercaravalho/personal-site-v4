// Builds the Spotify widget

import { useState, useEffect } from "preact/hooks";
import { getInfo } from "../services/getInfo";

export const SpotifyStatus = () => {
  const [activityData, setActivityData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetches Spotify data from Lanyard's (Discord) API
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
          <p class="text-[#ffffff] font-bold text-xs lg:text-3xl md:text-xl">
            {activityData?.data?.spotify === null
            ? "Recently Listened 🎧"
            : "Listening Now 🎧"}
          </p>
          <p class="text-[#ffffff] w-full lg:text-2xl text-xs font-semibold truncate">
            {activityData?.data?.spotify === null
              ? "Taylor Swift"
              : activityData?.data?.spotify.song}
          </p>
        </div>
        <div>
          <p class="text-[#ffffff] w-full lg:text-2xl text-xs truncate">
            {activityData?.data?.spotify === null
              ? "The Tortured Poets Department"
              : activityData?.data?.spotify.artist}
          </p>
        </div>
      <img
        loading="lazy"
        class="absolute w-full h-full top-0 left-0 object-center object-cover z-[-1]"
        src={
          activityData?.data?.spotify === null
            ? "../assets/spotify-offline.jpeg"
            : `${activityData?.data?.spotify.album_art_url}`
        }
        alt="Spotify Album"
      ></img>
    </div>
  );
};