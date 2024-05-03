// Function to get the weather from the OpenWeather API

export const getWeather = async () => {
  try {
    // API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Seattle&lang=en&units=imperial&appid=53504ce05c11aa5efc84eea6f2b461c2error`;

    // Fetch API
    const res = await fetch(url)
    if (!res.ok) {
      throw { status: res.status, statusText: res.statusText };
    }

    // Parse JSON
    const json = await res.json();

    // Check if JSON has the 'temp' property
    if (json && json.main && json.main.temp) {
      let temp = json.main.temp.toString().slice(0, 2),
        weather = json.weather[0].main,
        weatherEs = json.weather[0].description;
      return { temp, weather, weatherEs };

    } else {
      throw new Error(
        "Error getting weather from OpenWeather API - JSON does not have 'temp' property"
      );
    }

  } catch (error) {
    console.error("OpenWeather API Error Details: ", error);
    throw error;
  }
};
