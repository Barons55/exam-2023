<template>
  <div id="album-view">
    <div class="wrapper-header">
      <h1>ALBUMS</h1>
      <div class="settings">
        <button id="btn-grid" :class="{ active: isGrid }" @click="toggleLayout(true)">
          <IconGrid />
        </button>
        <button id="btn-list" :class="{ active: !isGrid }" @click="toggleLayout(false)">
          <IconList />
        </button>
      </div>
    </div>
    <ul id="list-albums" :class="{ grid: isGrid }">
      <li class="album" v-for="(album, index) in albums" :key="album.id" @click="selectAlbum(album.id)" :class="{ active: isActiveAlbum(album.id) }">
        <img id="img-album" :src="album.images[0].url" />
        <div class="album-info">
          <h4 id="txt-album-name">{{ album.name }}</h4>
          <p id="txt-album-artists">{{ album.artists }}</p>
          <div class="album-year">
            <p id="txt-album-year">{{ getYear(album.release_date) }}</p>
            <p id="txt-album-tracks">{{ getTrackAmount(album.tracks.length) }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import IconGrid from '../components/icons/IconGrid.vue';
import IconList from '../components/icons/IconList.vue';
import { usePlayerStore } from '@/stores/player';
import songsData from '../data/songs';

export default {
  components: {
    IconGrid,
    IconList,
  },
  data() {
    return {
      isGrid: true,
      clickedAlbumId: null,
    };
  },
  methods: {
    toggleLayout(isGrid) {
      this.isGrid = isGrid;
    },
    selectAlbum(albumId) {
      const player = usePlayerStore();
      if (this.clickedAlbumId === albumId) {
        player.setPlaylist(this.albums[albumId].tracks);
        player.setNowPlaying(this.albums[albumId].tracks[0]);
      }
      this.clickedAlbumId = albumId;
    },
    isActiveAlbum(albumId) {
      return this.clickedAlbumId === albumId;
    },
    getYear(releaseDate) {
      const year = new Date(releaseDate);
      return year.getFullYear();
    },
    getTrackAmount(trackCount) {
      return `${trackCount} ${trackCount > 1 ? 'songs' : 'song'}`;
    },
  },
  computed: {
    albums() {
      return songsData.reduce((accumulator, currentSong) => {
        const albumId = currentSong.album.id;
        if (!accumulator[albumId]) {
          accumulator[albumId] = {
            id: albumId,
            name: currentSong.album.name,
            artists: currentSong.album.artists.map(artist => artist.name).join(', '),
            release_date: currentSong.album.release_date,
            images: currentSong.album.images,
            tracks: [],
          };
        }
        accumulator[albumId].tracks.push(currentSong);
        return accumulator;
      }, {});
    },
  },
};
</script>

<style scoped>
/* Your component styles here */
</style>
