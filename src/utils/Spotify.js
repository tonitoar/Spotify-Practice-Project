// spotify.js - A module to handle Spotify authentication and token management

const CLIENT_ID = 'YOUR_CLIENT_ID'; // Replace with your actual client ID
const REDIRECT_URI = 'YOUR_REDIRECT_URI'; // Replace with your redirect URI
const SCOPES = 'playlist-modify-public playlist-modify-private'; // Define the necessary permissions

// Step 1: Redirect to Spotify authorization page
export function authorizeSpotify() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&state=state`;
  window.location = authUrl;
}

// Step 2: Get the access token from the URL and store it
export function getAccessTokenFromUrl() {
  const url = window.location.href;
  const tokenData = {};
  
  // Extract the access token and expiration time from the URL fragment
  if (url.includes('#')) {
    const urlParams = new URLSearchParams(url.split('#')[1]);
    tokenData.access_token = urlParams.get('access_token');
    tokenData.token_type = urlParams.get('token_type');
    tokenData.expires_in = parseInt(urlParams.get('expires_in'), 10);

    // Store the token and expiration time in localStorage
    if (tokenData.access_token) {
      localStorage.setItem('spotify_access_token', tokenData.access_token);
      localStorage.setItem('spotify_token_expiry', Date.now() + tokenData.expires_in * 1000);
    }

    // Clear URL fragment to prevent token from being reused
    window.history.pushState({}, document.title, window.location.pathname + window.location.search);
  }

  return tokenData.access_token || null;
}

// Step 3: Check if the token is expired and refresh it if necessary
export function isAccessTokenExpired() {
  const expiry = localStorage.getItem('spotify_token_expiry');
  return expiry && Date.now() > expiry;
}

// Step 4: Get the token from localStorage (if available and valid)
export function getAccessToken() {
  if (isAccessTokenExpired()) {
    // If the token is expired, clear it and force re-authentication
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_token_expiry');
    return null;
  }

  const token = localStorage.getItem('spotify_access_token');
  return token || null;
}
