<template>
    <div id="songs-view" @scroll="handleScroll">
      <!-- Header Section -->
      <div class="wrapper-header">
        <h1>SONGS</h1>
        <div class="wrapper-search">
          <input v-model="inputSearch" placeholder="Search by title..." />
        </div>
        <div class="wrapper-settings">
          <button :class="{ active: show_favorites }" @click="toggleFavorites">Show Favorites</button>
        </div>
      </div>
      <div class="wrapper-songs">
        <table cellspacing="0" cellpadding="0">
          <tr ref="header">
            <th id="th-id">#</th>
            <th id="th-title" @click="sortBy('name')">
              Title
              <IconCaretUp :class="{ 'flip-vertical': sortType === 'desc' && sortField === 'name' }" />
            </th>
            <th id="th-artist">Artist</th>
            <th id="th-album">Album</th>
            <th id="th-duration" @click="sortBy('duration_ms')">
              Duration
              <IconCaretUp :class="{ 'flip-vertical': sortType === 'desc' && sortField === 'duration_ms' }" />
            </th>
          </tr>
          <tr class="song" v-for="(song, index) in processedSongs" :key="song.id" @dblclick="playSong(song)">
            <td id="td-index">
              <IconPlay v-if="isNowPlaying(song)" />
              <span id="txt-index" v-if="!isNowPlaying(song)">{{ index + 1 }}</span>
            </td>
            <td id="td-title">
              <img :src="song.album?.images[0]?.url" />
              {{ song.name }}
            </td>
            <td id="td-artist">{{ getArtistsString(song.artists) }}</td>
            <td id="td-album">{{ song.album?.name }}</td>
            <td id="td-duration">{{ getTime(song.duration_ms) }}</td>
            <IconHeart :class="{ active: isFavorite(song.id) }" @click="toggleFavorite(song)" />
        </tr>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import IconCaretUp from '../components/icons/IconCaretUp.vue';
  import IconPlay from '../components/icons/IconPlay.vue';
  import IconHeart from '../components/icons/IconHeart.vue';
  import songsData from '../data/songs.js';
  import { usePlayerStore } from '../stores/player';
  
  export default {
    data() {
      return {
        inputSearch: '',
        show_favorites: false,
        sortType: 'asc',
        sortField: '',
        songs: songsData,
        nowPlayingSongId: null,
        favorites: [],
      };
    },
    components: {
      IconCaretUp,
      IconPlay,
      IconHeart,
    },
    computed: {
      filteredSongsList() {
        let filteredSongs = this.songs;
  
        if (this.inputSearch) {
          const searchQuery = this.inputSearch.toLowerCase();
          filteredSongs = filteredSongs.filter(song => song.name.toLowerCase().includes(searchQuery));
        }
  
        if (this.show_favorites) {
          filteredSongs = filteredSongs.filter(song => this.isFavorite(song.id));
        }
  
        if (this.sortField && this.sortType) {
          filteredSongs.sort((a, b) => {
            const fieldA = a[this.sortField] ?? '';
            const fieldB = b[this.sortField] ?? '';
  
            if (this.sortType === 'asc') {
              return fieldA.localeCompare(fieldB);
            } else {
              return fieldB.localeCompare(fieldA);
            }
          });
        }
  
        return filteredSongs;
      },
      processedSongs() {
        return this.filteredSongsList;
      },
    },
    methods: {
      toggleFavorites() {
        this.show_favorites = !this.show_favorites;
      },
      sortBy(field) {
        if (this.sortField === field) {
          this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortType = 'asc';
          this.sortField = field;
        }
      },
      isNowPlaying(song) {
        return song.id === this.nowPlayingSongId;
      },
      playSong(song) {
        const player = usePlayerStore();
        player.setNowPlaying(song);
        player.play();
      },
      getArtistsString(artists) {
        return artists.map(artist => artist.name).join(', ');
      },
      getTime(duration_ms) {
        const minutes = Math.floor(duration_ms / 60000);
        const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
      },
      toggleFavorite(song) {
        const index = this.favorites.findIndex(favorite => favorite.id === song.id);
        if (index !== -1) {
          this.favorites.splice(index, 1); 
        } else {
          this.favorites.push(song); 
        }
      },
      isFavorite(songId) {
        return this.favorites.some(favorite => favorite.id === songId);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your component styles here */
  </style>
  
