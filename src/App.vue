<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import registerSW from './registerServiceWorker';

export default {
    name: 'App',
    components: {
        NavBar
    },
    beforeCreate () {
        this.$store.dispatch('loadCache');
        if (
            !this.$store.state.settings.token
            || !this.$store.state.settings.proxyURL
            || !this.$store.state.application
            || !this.$store.state.guild
        ) this.$router.push('/settings');
    },
    mounted () {
        if (window.location.protocol === 'https:') registerSW();
        window.addEventListener('beforeinstallprompt', (e) => {
            this.installPWA.prompt = () => {
                e.prompt();
                e.userChoice.then((rs) => {
                    if (rs.outcome === 'accepted') {
                        if (window.ga) window.ga.logEvent('install');
                        window.location.reload();
                    }
                });
            };
            setTimeout(() => this.installPWA.prompt(), 2000);
        });
    }
};
</script>

<style lang="scss">
html, body {
    background-color: #2C2F33 !important;
}
</style>
