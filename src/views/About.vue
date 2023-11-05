<template>
    <div id="about-view">
      <div class="wrapper-header">
        <h1>ABOUT ME</h1>
        <div class="settings">
          <button id="btn-edit" :class="{ active: editMode }" @click="toggleEditMode">
            {{ editMode ? "Cancel" : "Edit Form" }}
          </button>
          <button id="btn-save" v-if="editMode" class="submit" @click="saveForm">Save Form</button>
        </div>
      </div>
      <form>
        <div class="wrapper-input">
          <label>NAME</label>
          <input id="input-name" v-if="editMode" v-model="user_form.name" />
          <p id="txt-name" v-else>{{ userData.name }}</p>
        </div>
        <div class="wrapper-input">
          <label>SURNAME</label>
          <input id="input-surname" v-if="editMode" v-model="user_form.surname" />
          <p id="txt-surname" v-else>{{ userData.surname }}</p>
        </div>
        <div class="wrapper-input">
          <label>STUDENT CODE</label>
          <input id="input-code" v-if="editMode" v-model="user_form.code" />
          <p id="txt-code" v-else>{{ userData.code }}</p>
        </div>
        <div class="wrapper-songs">
          <label>FAVORITE SONGS</label>
          <ul v-if="user_form.favorite_songs.length > 0">
            <li v-for="song in user_form.favorite_songs" :key="song.id">
              <img id="img-album" :src="song.album.images[1].url" />
              <div class="song-info">
                <p id="txt-song" class="song-name">{{ song.name }}</p>
                <p id="txt-artist" class="song-artists">{{ getArtists(song.artists) }}</p>
              </div>
            </li>
          </ul>
          <div v-else id="txt-empty" class="empty">NO SONGS FOUND</div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  
  export default {
    setup() {
      const authStore = useAuthStore();
  
      const user_form = ref({
        name: authStore.user.name,
        surname: authStore.user.surname,
        code: authStore.user.code,
        favorite_songs: authStore.user.favorite_songs.map(songID => getSongDetailsByID(songID)),
      });
  
      const editMode = ref(false);
  
      const toggleEditMode = () => {
        editMode.value = !editMode.value;
      };
  
      const saveForm = () => {
        authStore.setUserData(user_form.value.name, user_form.value.surname, user_form.value.code);
        editMode.value = false;
      };
  
      const userData = computed(() => authStore.user);
  
      const getArtists = artists => artists.map(artist => artist.name).join(', ');
  
      
      const getSongDetailsByID = (songID) => {
       
      };
  
      return {
        user_form,
        editMode,
        toggleEditMode,
        saveForm,
        userData,
        getArtists,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Your component styles here */
  </style>
  
