// spotify.js - A module to handle Spotify authentication and token management

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const SCOPES = 'playlist-modify-public playlist-modify-private'; 

// Step 1: Redirect to Spotify authorization page
export function authorizeSpotify() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}&state=state`;
  window.location = authUrl;
}

// Step 2: Get the access token from the URL and store it
export function getAccessTokenFromUrl() {
  const url = window.location.href;
  const tokenData = {};
  
  if (url.includes('#')) {
    const urlParams = new URLSearchParams(url.split('#')[1]);
    tokenData.access_token = urlParams.get('access_token');
    tokenData.token_type = urlParams.get('token_type');
    tokenData.expires_in = parseInt(urlParams.get('expires_in'), 10) || 3600; // Default to 1 hour if missing

    if (tokenData.access_token) {
      sessionStorage.setItem('spotify_access_token', tokenData.access_token);
      sessionStorage.setItem('spotify_token_expiry', Date.now() + tokenData.expires_in * 1000);
    } else {
      console.error('Error retrieving Spotify token');
    }

    // Clear URL fragment
    window.history.pushState({}, document.title, window.location.pathname + window.location.search);
  }

  return tokenData.access_token || null;
}

// Step 3: Check if the token is expired
export function isAccessTokenExpired() {
  const expiry = sessionStorage.getItem('spotify_token_expiry');
  return !expiry || Date.now() > expiry;
}

// Step 4: Get the token from sessionStorage (if available and valid)
export function getAccessToken() {
  if (isAccessTokenExpired()) {
    console.warn("Spotify token expired. Redirecting to login...");
    sessionStorage.removeItem('spotify_access_token');
    sessionStorage.removeItem('spotify_token_expiry');
    return null;
  }

  return sessionStorage.getItem('spotify_access_token');
}

export async function searchSpotifyTracks(query)  {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("No access token available");
    return [];
  }

  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    console.error("Spotify API error:", response.statusText);
    return [];
  }

  const data = await response.json();

  return data.tracks.items.map((track) => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    uri: track.external_urls.spotify,
  }));
}

