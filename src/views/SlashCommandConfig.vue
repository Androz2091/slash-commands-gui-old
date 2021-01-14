<template>
    <b-container>
        <b-button class="mb-2 cmd-name bg-discord" size="sm" @click="back">
            <b-icon icon="arrow90deg-left" aria-label="Back"></b-icon>
        </b-button>
        <h3 class="cmd-name">Configuration for command /{{ command.name }}</h3>
        <b-jumbotron class="jumbo-config">
            <h4>Configuration</h4>
            <b-row>
                <b-col md="6">
                    <b-form-group
                    id="fieldset-1"
                    description="The command will be executed when this is written by someone."
                    label="Name"
                    label-for="input-name"
                    :invalid-feedback="nameStateMessage"
                    :state="nameState"
                    >
                    <b-input-group prepend="/" class="mt-3" style="color: black !important;">
                        <b-form-input id="input-name" v-model="name" :state="nameState" trim></b-form-input>
                    </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <b-form-group
                    id="fieldset-1"
                    description="Explain to your users what this command does."
                    label="Description"
                    label-for="input-description"
                    :invalid-feedback="descriptionStateMessage"
                    :state="descriptionState"
                    >
                    <b-form-input id="input-description" v-model="description" :state="descriptionState" trim></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-overlay
                :show="showOverlay"
                rounded
                opacity="0.6"
                spinner-small
                spinner-variant="primary"
                class="d-inline-block"
            >
                <b-button class="bg-discord" @click="handleSubmit">Update</b-button>
            </b-overlay>
        </b-jumbotron>
    </b-container>
</template>

<script>
import { updateCommand } from '../api';

export default {
    name: 'SlashCommandConfig',
    data () {
        return {
            name: '',
            description: '',

            nameState: null,
            descriptionState: null,

            nameStateMessage: '',
            descriptionStateMessage: '',

            showOverlay: false
        };
    },
    watch: {
        name () {
            this.checkFormValidity();
        },
        description () {
            this.checkFormValidity();
        }
    },
    beforeMount () {
        this.name = this.command.name;
        this.description = this.command.description;
    },
    methods: {
        handleSubmit () {
            const isFormValid = this.checkFormValidity();
            if (isFormValid) {
                const command = this.$store.state.commands.find((cmd) => cmd.id === this.commandID);
                command.name = this.name;
                command.description = this.description;
                this.showOverlay = true;
                updateCommand(this.$store.state.settings.token, this.$store.state.settings.proxyURL, this.$store.state.application.id, this.$store.state.settings.guildID, command).then(() => {
                    this.showOverlay = false;
                });
            }
        },
        checkFormValidity () {
            const nameEmpty = this.name.length === 0;
            const alreadyExists = this.$store.state.commands.some((c) => c.name === this.name);
            if (nameEmpty && alreadyExists) {
                this.nameState = false;
                this.nameStateMessage = nameEmpty ? 'Name is required' : 'There is already a ommand with this name';
            } else this.nameState = true;
            const descriptionEmpty = this.description.length === 0;
            if (descriptionEmpty) {
                this.descriptionState = false;
                this.descriptionStateMessage = 'Description is required';
            } else this.descriptionState = true;
            return this.nameState && this.descriptionState;
        },
        back () {
            this.$router.go(-1);
        }
    },
    computed: {
        commandID () {
            const subCommandRegex = /\/commands\/([a-z0-9]+)/;
            const [, commandID] = this.$route.fullPath.match(subCommandRegex);
            return commandID;
        },
        command () {
            return this.$store.state.commands.find((cmd) => cmd.id === this.commandID);
        }
        /* commandData () {
            let subCommandsPath = this.$route.fullPath.substr(`/commands/${this.commandID}`.length, this.$route.fullPath.length);
            let subCommandData = this.command;
            const subCommands = [];
            while (subCommandsPath.length > 0) {
                const [, subCommand] = subCommandsPath.match(/(\/sub\/[a-z]+){1}/);
                const subCommandName = subCommand.substr('/sub/'.length, subCommand.length);
                subCommandsPath = subCommandsPath.substr(`/sub/${subCommandName}`.length, subCommandsPath.length);
                subCommands.push(subCommandName);
            }
            return this.$store.state.commands.find((cmd) => cmd.id === commandID);
        } */
    }
};
</script>

<style scoped>
* {
    color: white;
}
.cmd-name {
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: center;
};
</style>

<style>
.jumbotron {
    background-color: #23272A !important;
}
.input-group-text {
    color: #23272A !important;
}
.form-control {
    color: black;
}
.bg-discord {
    background-color: #7289DA;
}
</style>
