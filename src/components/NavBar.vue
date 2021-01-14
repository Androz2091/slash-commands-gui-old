<template>
    <b-navbar toggleable="lg" type="dark" variant="info" class="bg-discord">
        <b-navbar-brand href="#">Slash Commands GUI</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav class="ml-auto">
            <router-link to="settings"><b-button size="sm" class="my-2 my-sm-0 bg-discord-btn" :disabled="inSettings">Settings</b-button></router-link>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: 'NavBar',
    computed: {
        inSettings () {
            return this.$route.path === '/settings';
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
    color: white;
}
.bg-discord {
    background-color: #7289DA !important;
};
.bg-discord-btn {
    background-color: #FFFFFF;
    color: black;
}
</style>
