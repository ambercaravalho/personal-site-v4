// Builds the weather and time widget

import { useState, useEffect } from "preact/hooks";
import { getWeather } from "../services/getWeather";
import "./Styles.css";

function ShowTime() {
  const [currentHours, setCurrentHours] = useState(getCurrentHours());
  const [hourConditional, setHourConditional] = useState(getHoursConditional());
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  // Sets language
  useEffect(() => {
    const userLanguage = document.documentElement.getAttribute("lang");
    setLanguage(userLanguage);
  }, []);

  // Fetches weather data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeather();
        setWeather(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Weather Fetch Error Details: ", err);
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Refreshes data every 3 hours
    const interval = setInterval(fetchData, 10800000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Updates time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHours(getCurrentHours());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Formats time
  function getCurrentHours() {
    const currentTime = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const hours = currentTime.split(", ")[1].split(":")[0].padStart(2, '0');
    const minutes = currentTime.split(":")[1];

    return `${hours}:${minutes} hrs PT`;
  }

  function getHoursConditional() {
    const currentTime = getCurrentHours();
    const currentHour = parseInt(currentTime.split(":")[0]);

    return currentHour;
  }

  // Displays when fetching data
  if (isLoading) {
    return (
      <div class="bg-[#089cffa4] w-full flex overflow-hidden bg-clip-padding text-white py-2 px-4 lg:p-8`">
        <div class="flex flex-col justify-center lg:h-full w-2/3 absolute lg:static z-10">
          <p class="text-white capitalize text-xs md:text-xl lg:text-2xl font-semibold lg:mb-0">Loading...</p>
        </div>
        <div class="absolute right-0 top-0 flex z-0 items-center w-full h-full overflow-hidden justify-end">
          <div class="TimeCard_hot__Br_X1 TimeCard_container__bLNa3 w-20 h-20 md:w-56 md:h-56 right-5">
            <span class="TimeCard_sun___9W9H w-10 h-10 md:w-24 md:h-24"></span>
            <span class="TimeCard_sunx__Dp1CZ"></span>
          </div>
        </div>
      </div>
    );
  }

  // Displays weather and time once loaded
  return (
    <div
      class={`${
        hourConditional >= 8 && hourConditional <= 18
          ? "bg-[#089cffa4]"
          : "bg-[#001324]"
      } w-full flex overflow-hidden bg-clip-padding text-white py-2 px-4 lg:p-8`}>

      <div class="flex flex-col justify-center lg:h-full absolute lg:static z-10">
        <div>
          <p class="text-lg md:text-5xl lg:text-7xl font-bold">{weather?.temp}°</p>
          <p class="capitalize text-xs md:text-xl lg:text-2xl font-semibold lg:mb-0">{weather?.weather}</p>
          <p class="text-xs md:text-md lg:text-lg">{currentHours}</p>
          <p class="text-xs md:text-md lg:text-lg">In Seattle, WA</p>
        </div>
      </div>

      {hourConditional >= 8 && hourConditional <= 18 ? (
        <div class="absolute right-0 top-0 flex z-0 items-center w-full h-full overflow-hidden justify-end">
          <div class="TimeCard_hot__Br_X1 TimeCard_container__bLNa3 w-20 h-20 md:w-56 md:h-56 right-5">
            <span class="TimeCard_sun___9W9H w-10 h-10 md:w-24 md:h-24"></span>
            <span class="TimeCard_sunx__Dp1CZ"></span>
          </div>
        </div>
      ) : (
        <div class="absolute right-0 top-0 flex justify-end z-0 items-center w-full h-full overflow-hidden">
          <div class="TimeCard_night__BfZ0q TimeCard_container__bLNa3 w-20 h-20 md:w-56 md:h-56 right-5">
            <span class="TimeCard_moon__scQu9 w-10 h-10 md:w-24 md:h-24"></span>
            <span class="TimeCard_spot1__SaOIN"></span>
            <span class="TimeCard_spot2__Cq_4z"></span>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowTime;
