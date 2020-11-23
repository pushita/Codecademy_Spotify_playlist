import React from "react";
import "./App.css";
import { SearchBar } from "./../searchBar/SearchBar";
import { SearchResults } from "../searchResults/SearchResults";
import { PlayList } from "../playList/PlayList";
import {Spotify} from "../../util/Spotify"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: "name1", artist: "artist", album: "album", id: "1" },
        { name: "name2", artist: "artist", album: "album", id: "2" },
        { name: "name3", artist: "artist", album: "album", id: "3" },
      ],
      playlistName: "Favourite songs",
      playlistTracks: [
        {
          name: "Favourite name1",
          artist: "Favourite artist",
          album: "Favourite album",
          id: "4",
        },
        {
          name: "Favourite name2",
          artist: "Favourite artist",
          album: "Favourite album",
          id: "5",
        },
        {
          name: "Favourite name3",
          artist: "Favourite artist",
          album: "Favourite album",
          id: "6",
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    }
    this.setState({ playlistTracks: [...this.state.playlistTracks, track] });
  }

  removeTrack(track) {
    const reducedPlylist = this.state.playlistTracks.filter(
      (trackOne) => trackOne.id !== track.id
    );
    this.setState({ playlistTracks: reducedPlylist });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
  }

  search(term) {
    Spotify.search(term);
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <PlayList
              playlistTracks={this.state.playlistTracks}
              playlistName={this.state.playlistName}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
