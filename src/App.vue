<template>
  <div id="app">
    <NavBar />
    <Gui />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Gui from './components/Gui.vue';
import registerSW from './registerServiceWorker';

export default {
    name: 'App',
    components: {
        NavBar,
        Gui
    },
    beforeCreate () {
        this.$store.dispatch('loadToken');
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
