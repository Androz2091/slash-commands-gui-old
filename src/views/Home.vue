<template>
    <div>
        <b-container class="results">
            <h1 class="text-white title is-4">{{ $store.state.settings.guildID ? `${$store.state.guild.name}'s` : 'Global' }} Slash Commands</h1>
            <p v-if="$store.state.settings.guildID" class="text-white">As you specified a guild ID, the results shown are the commands dedicated to the {{ $store.state.guild.name }} server. Click <router-link to="/settings">here</router-link> to edit the settings and load all the global commands.</p>
            <b-row>
                <b-col v-for="command in $store.state.commands" :key="command.name" cols="12" sm="6" md="3">
                    <SlashCommandCard :name="command.name" :description="command.description" :id="command.id" :options="command.options" />
                </b-col>
                <b-col cols="12" sm="6" md="3">
                    <CreateSlashCommand />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

import SlashCommandCard from '../components/SlashCommandCard.vue';
import CreateSlashCommand from '../components/CreateSlashCommand.vue';

export default {
    name: 'Home',
    mounted () {
        console.log(this.$store.state.commands);
    },
    components: {
        SlashCommandCard,
        CreateSlashCommand
    },
    methods: {
        switchGlobal () {
            this.$store.dispatch('saveSettings', {
                token: this.$store.state.settings.token,
                proxyURL: this.$store.state.settings.proxyURL,
                guildID: null
            });
            this.$store.commit('SET_COMMANDS', {});
        }
    }
};
</script>

<style lang="scss" scoped>
.results {
    padding-top: 50px;
}
.container {
    margin: 0 !important;
    margin-left: calc(10%) !important;
    margin-right: calc(10%) !important;
}
</style>
