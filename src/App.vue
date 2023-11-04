<script>
import { useAuthStore } from './stores/auth.js'
import NavigationComponent from '@/components/NavigationComponent.vue';

export default {
    components: {
        NavigationComponent
    },
    computed: {
        loggedIn() {
        const state = useAuthStore();
        return state.authenticated;
        }
    }
}
</script>
<template>
    <!--  HEADER  -->
    <Header v-if="loggedIn"></Header>
    <!--  HEADER END  -->

    <!--  BODY  -->
    <div id="section-body">
        <NavigationComponent v-if="loggedIn"/>
        <router-view class="section-router"></router-view>
    </div>
    <!--  BODY END  -->

    <!--  PLAYER  -->
    <div id="section-player"  v-if="loggedIn" >
        <AudioPlayer/>
    </div>
    <!--  PLAYER END  -->
</template>