// Function to fetch Discord Presence from the Lanyard API.

export const getInfo = async () => {
  try {
    // API URL
    const response = await fetch(
      "https://api.lanyard.rest/v1/users/334914085328257026"
    );

    // Check if response returned an error
    if (!response.ok) {
      throw new Error("Error getting Discord Presence from Lanyard API");
    }

    // Parse JSON
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Discord Presence API Error Details: ", error);
    throw error;
  }
};
