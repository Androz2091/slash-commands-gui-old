<template>
    <div>
        <hr>
        <div class="container config">
            <div class="columns">
                <div class="column">
                    <b-input v-model="$store.state.token" placeholder="Your super secret Discord bot token"></b-input>
                </div>
                <div class="column">
                    <b-button class="load-btn text-white" @click="loadCommands()" :disabled="loadBtnDisabled">Load Slash Commands</b-button>
                </div>
            </div>
        </div>
        <hr>
        <div class="container results" v-if="resultsLoaded">
            <h1 class="text-white title is-4">ManageInvite's Slash Commands</h1>
            <div class="columns">
                <div class="column is-two-fifths" v-for="command in $store.state.commands" :key="command.name">
                    <SlashCommand :name="command.name" :description="command.description" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SlashCommand from './SlashCommand.vue';

export default {
    name: 'Gui',
    components: {
        SlashCommand
    },
    data () {
        return {
            resultsLoaded: false
        };
    },
    computed: {
        loadBtnDisabled () {
            return this.$store.state.token.length === 0;
        }
    },
    methods: {
        loadCommands () {
            this.$store.dispatch('saveToken', this.$store.state.token);
            this.$store.dispatch('loadCommands');
            this.resultsLoaded = true;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
hr {
    background-color: grey;
}
.text-white {
    color: white;
}
.config {
    padding-top: 5px;
}
.load-btn {
    background-color: #7289DA;
    border-color: transparent;
}
.results {
    padding-top: 50px;
}
.container {
    margin: 0 !important;
    margin-left: calc(10%) !important;
    margin-right: calc(10%) !important;
}
</style>
