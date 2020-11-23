const clientID = "d7c47a78de654016b5497aa74f0a3f3a";
const redirectUri = "http://localhost:3000/";
let token;
export const Spotify = {
  getAccessToken() {
    if (token) {
      return token;
    }
    //check for the access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      token = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      //Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired
      window.setTimeout(() => (token = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return token;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(searchItem) {
    const accessToken = Spotify.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchItem}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request failed!");
        },
        (networkError) => console.log(networkError.message)
      )
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
};

export default Spotify;
