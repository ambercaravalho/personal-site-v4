// Builds the Spotify widget

import { useState, useEffect } from "preact/hooks";
import { getCurrentTrack } from "../services/getSpotify";

export const SpotifyStatus = () => {
  const [trackData, setTrackData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Initiating data fetch...");
      try {
        const data = await getCurrentTrack();
        console.log("Data received from Spotify API:", data);
        setTrackData(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Spotify Data Fetch Error Details: ", err);
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => {
      clearInterval(interval);
      console.log("Cleaned up interval for fetching Spotify data");
    };
  }, []);

  if (isLoading) {
    return (
      <>
        <p class="text-[#ffffff] font-bold text-xs lg:text-3xl md:text-xl">Loading...</p>
        <img loading="lazy" class="absolute w-full h-full top-0 left-0 object-center object-cover z-[-1]" src="../assets/spotify-generic.jpeg" alt="Generic Spotify Album Cover"></img>
      </>
    );
  }

  return (
    <div class="flex flex-col">
      <div class="flex flex-col gap-4">
        <p class="text-[#ffffff] font-bold text-xs lg:text-3xl md:text-xl">
          {trackData?.songTitle ? "Listening Now 🎧" : "Recently Listened 🎧"}
        </p>
        <p class="text-[#ffffff] w-full lg:text-2xl text-xs font-semibold truncate">
          {trackData?.songTitle || "Nothing playing"}
        </p>
      </div>
      <div>
        <p class="text-[#ffffff] w-full lg:text-2xl text-xs truncate">
          {trackData?.artist || "No artist information"}
        </p>
      </div>
      <img
        loading="lazy"
        class="absolute w-full h-full top-0 left-0 object-center object-cover z-[-1]"
        src={trackData?.albumArtwork || "../assets/spotify-offline.jpeg"}
        alt="Spotify Album"
      ></img>
    </div>
  );
};
