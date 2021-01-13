<template>
  <div id="app">
    <NavBar />
    <Gui />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Gui from './components/Gui.vue';

export default {
    name: 'App',
    components: {
        NavBar,
        Gui
    },
    beforeCreate () {
        this.$store.dispatch('loadToken');
    }
};
</script>

<style lang="scss">
html, body {
    background-color: #2C2F33 !important;
}
</style>
