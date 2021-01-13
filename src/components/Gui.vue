<template>
    <div>
        <hr>
        <b-container class="config">
            <b-row>
                <b-col cols="5">
                    <b-input v-model="token" placeholder="Your super secret Discord bot token"></b-input>
                </b-col>
                <b-col cols="3">
                    <b-input v-model="guildID" placeholder="Guild ID (optional)"></b-input>
                </b-col>
                <b-col cols="4">
                    <b-button class="load-btn text-white" @click="loadCommands()" :disabled="loadBtnDisabled">Load Slash Commands</b-button>
                </b-col>
            </b-row>
        </b-container>
        <hr>
        <b-container class="results" v-if="loaded">
            <h1 class="text-white title is-4">{{ $store.state.guildID ? `${$store.state.guild.name}'s` : 'Global' }} Slash Commands</h1>
            <p v-if="$store.state.guildID" class="text-white">As you specified a guild ID, the results shown are the commands dedicated to the {{ $store.state.guild.name }} server. Click <a @click="switchGlobal" href="#">here</a> to load all the global commands.</p>
            <b-row cols="3">
                <b-col v-for="command in $store.state.commands" :key="command.name" >
                    <SlashCommand :name="command.name" :description="command.description" />
                </b-col>
                <b-col>
                    <CreateSlashCommand />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import SlashCommand from './SlashCommand.vue';
import CreateSlashCommand from './CreateSlashCommand.vue';

export default {
    name: 'Gui',
    components: {
        SlashCommand,
        CreateSlashCommand
    },
    data () {
        return {
            token: '',
            guildID: ''
        };
    },
    created () {
        this.token = this.$store.state.token;
        this.guildID = this.$store.state.guildID;
    },
    computed: {
        loaded () {
            return this.$store.state.application && (this.$store.state.guildID ? this.$store.state.guild : true);
        },
        loadBtnDisabled () {
            return this.$store.state.token.length === 0;
        }
    },
    methods: {
        loadCommands () {
            this.$store.dispatch('saveToken', this.token);
            this.$store.dispatch('saveGuildID', this.guildID);
            this.$store.dispatch('load');
        },
        switchGlobal () {
            this.guildID = null;
            this.$store.dispatch('saveGuildID', '');
            this.$store.dispatch('load');
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
