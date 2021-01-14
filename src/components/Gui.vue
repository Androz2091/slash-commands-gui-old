<template>
    <div>
        <b-container class="results">
            <h1 class="text-white title is-4">{{ $store.state.settings.guildID ? `${$store.state.guild.name}'s` : 'Global' }} Slash Commands</h1>
            <!-- <p v-if="$store.state.guildID" class="text-white">As you specified a guild ID, the results shown are the commands dedicated to the {{ $store.state.guild.name }} server. Click <a @click="switchGlobal" href="#">here</a> to load all the global commands.</p> -->
            <b-row>
                <b-col v-for="command in $store.state.commands" :key="command.name" cols="12" sm="6" md="3">
                    <SlashCommand :name="command.name" :description="command.description" :id="command.id" :options="command.options" />
                </b-col>
                <b-col cols="12" sm="6" md="3">
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
    mounted () {
        console.log(this.$store.state.commands);
    },
    components: {
        SlashCommand,
        CreateSlashCommand
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
.config-el {
    margin-top: 5px;
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
