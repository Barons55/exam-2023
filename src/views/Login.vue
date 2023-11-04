<script>
import { useAuthStore } from '../stores/auth';

export default {
  data() {
    return {
      userEmail: '',
      userPassword: '',
    };
  },
  computed: {
    isDisabled() {
      return this.userEmail.trim().length !== 0 || this.userPassword.trim().length < 0;
    },
  },
  methods: {
      submitForm() {
      if (!this.isDisabled) {
      const state = useAuthStore();
      state.authenticate(this.userEmail, this.userPassword)
       
  }
},
}
};
</script>

<template>
    <div id="login-view">
      <form class="login-form">
        <div class="wrapper-logo">
          <img src="@/assets/logo.svg" />
          <div>KRAKEN.FM</div>
        </div>
        <input id="input-email" placeholder="E-mail" v-model="userEmail" />
        <input id="input-password" placeholder="Password" type="password" v-model="userPassword" />
        <button id="btn-submit" @click.prevent="submitForm" :disabled="isDisabled">LOGIN</button>
      </form>
    </div>
  </template>
  
 