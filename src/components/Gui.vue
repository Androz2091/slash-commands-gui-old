<template>
    <div class="container config">
        <div class="columns">
            <div class="column">
                <b-input v-model="$store.state.token" placeholder="Your super secret Discord bot token"></b-input>
            </div>
            <div class="column">
                <b-button class="load-btn" @click="loadCommands()" :disabled="loadBtnDisabled">Load Slash Commands</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Gui',
    data () {
        return {};
    },
    computed: {
        loadBtnDisabled () {
            return this.$store.state.token.length === 0;
        }
    },
    methods: {
        loadCommands () {
            this.$store.dispatch('saveToken', this.$store.state.token);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.config {
    padding-top: 20px;
}
.load-btn {
    background-color: #7289DA;
    color: white;
    border-color: transparent;
}
</style>
