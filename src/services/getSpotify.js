import fetch from 'node-fetch';

// Hardcoded credentials for Spotify API
const clientId = 'af0ee28f584b42838f102393a6e02468';
const clientSecret = '7b0dcc489e9d4a14bad084a2db98ee45';

// Helper function to encode credentials
const encodeCredentials = (clientId, clientSecret) => {
    return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
};

// Function to retrieve Spotify access token
const getSpotifyAccessToken = async () => {
    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
        'Authorization': `Basic ${encodeCredentials(clientId, clientSecret)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = 'grant_type=client_credentials';

    try {
        console.log("Requesting Spotify access token...");
        const response = await fetch(url, { method: 'POST', headers, body });
        const data = await response.json();
        console.log("Access token response:", data);
        if (!response.ok) {
            throw new Error(`Spotify Auth API Error: ${data.error_description}`);
        }
        return data.access_token;
    } catch (error) {
        console.error('Spotify Auth API Error Details:', error);
        throw error;
    }
};

// Function to fetch the currently playing track
export const getCurrentTrack = async () => {
    const accessToken = await getSpotifyAccessToken();
    const url = 'https://api.spotify.com/v1/me/player/currently-playing';
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    try {
        console.log("Fetching currently playing track...");
        const response = await fetch(url, { headers });
        const data = await response.json();
        console.log("Currently playing track response:", data);
        if (!response.ok) {
            throw new Error("Error fetching currently playing track");
        }
        if (data && data.is_playing) {
            return {
                songTitle: data.item.name,
                artist: data.item.artists.map(artist => artist.name).join(', '),
                albumArtwork: data.item.album.images[0].url
            };
        } else {
            return { songTitle: 'Nothing is playing currently', artist: '', albumArtwork: '' };
        }
    } catch (error) {
        console.error('Spotify Currently Playing Track API Error Details:', error);
        throw error;
    }
};
