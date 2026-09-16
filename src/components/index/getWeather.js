// Function to get the weather from the Open-Meteo API

// Seattle, WA
const LATITUDE = 47.6062;
const LONGITUDE = -122.3321;

// WMO weather codes, as documented at https://open-meteo.com/en/docs
const WEATHER_CODES = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Freezing fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  56: "Freezing drizzle",
  57: "Freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Light showers",
  81: "Showers",
  82: "Heavy showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with hail",
};

export const getWeather = async () => {
  try {
    // API URL - no key required
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles`;

    // Fetch API
    const res = await fetch(url);
    if (!res.ok) {
      throw { status: res.status, statusText: res.statusText };
    }

    // Parse JSON
    const json = await res.json();

    // Check if JSON has a current temperature
    if (json && json.current && typeof json.current.temperature_2m === "number") {
      let temp = Math.round(json.current.temperature_2m).toString(),
        weather = WEATHER_CODES[json.current.weather_code] ?? "Unknown";
      return { temp, weather };

    } else {
      throw new Error(
        "Error getting weather from Open-Meteo API - response does not have a current temperature"
      );
    }

  } catch (error) {
    console.error("Open-Meteo API Error Details: ", error);
    throw error;
  }
};
