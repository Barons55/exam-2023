import { defineStore } from 'pinia';
import router from "../router/index.js";

const getDefaultUser = () => {
  return {
    name: 'Karlis',
    surname: 'Barons',
    code: 'IT21074',
    favorite_songs: localStorage.favorite_songs ? localStorage.favorite_songs.split(",") : []
  };
};

export const useAuthStore = defineStore('authentication', {
  state: () => ({
    user: getDefaultUser(),
    authenticated: false,
  }),

  getters: {
    is_authenticated() {
      return localStorage.authenticated === 'true' || this.authenticated;
    },
    getFavoriteSongs() {
      return this.user.favorite_songs;
    },
  },

  actions: {
    setUserData(name, surname, code) {
      this.user.name = name;
      this.user.surname = surname;
      this.user.code = code;
    },

    authenticate(email, password) {
      if (email === "karlis.barons@va.lv" && password === "123456") {
        console.log('LOGGED IN');
        localStorage.authenticated = true;
        this.authenticated = true;
        router.push('/');
      } else {
        console.log('Authentication failed');
        localStorage.authenticated = false;
        this.authenticated = false;
      }
    },

    logout() {
      localStorage.clear();
      this.user = getDefaultUser();
      this.authenticated = false;
      router.push('/login');
    },

    toggleFavorite(songID) {
      const index = this.user.favorite_songs.indexOf(songID);
      if (index !== -1) {
        this.user.favorite_songs.splice(index, 1);
      } else {
        this.user.favorite_songs.push(songID);
      }
      localStorage.favorite_songs = this.user.favorite_songs.join(",");
    },
  }
});