<template>
    <div>
        <b-card text-variant="white" class="text-center" header="Create a new command" @click="openSubCommand">
            <b-icon icon="plus-circle" class="h1 mb-2"></b-icon>
        </b-card>

        <b-modal id="modal-prevent-closing" v-model="showCreateModal" centered title="Create a new Slash Command" @hidden="resetModal" @ok="handleOk" @show="resetModal" modal-ok="s">
             <form @submit.stop.prevent="handleSubmit">
                <b-form-group
                    label="Name"
                    label-for="name-input"
                    :invalid-feedback="nameStateMessage"
                    :state="nameState"
                >
                <b-form-input
                    v-model="createName"
                    :state="nameState"
                    required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                    label="Description"
                    label-for="name-input"
                    :invalid-feedback="descriptionStateMessage"
                    :state="descriptionState"
                >
                <b-form-input
                    v-model="createDescription"
                    :state="descriptionState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <template v-slot:modal-ok>
                Create a new command
            </template>
        </b-modal>
    </div>
</template>

<script>
import { updateCommand } from '../api';

export default {
    name: 'SlashCommand',
    props: {
        name: String,
        description: String
    },
    data () {
        return {
            createName: '',
            createDescription: '',

            nameState: null,
            descriptionState: null,

            nameStateMessage: '',
            descriptionStateMessage: '',

            showCreateModal: false
        };
    },
    watch: {
        createName () {
            this.checkFormValidity();
        },
        createDescription () {
            this.checkFormValidity();
        }
    },
    methods: {
        checkFormValidity () {
            const nameEmpty = this.createName.length < 1;
            const nameExists = this.$store.state.commands.some((cmd) => cmd.name === this.createName);
            if (nameEmpty || nameExists) {
                this.nameState = false;
                this.nameStateMessage = nameEmpty ? 'Name is required' : 'This command already exists';
            } else this.nameState = true;
            const descriptionEmpty = this.createDescription.length < 1;
            if (descriptionEmpty) {
                this.descriptionState = false;
                this.descriptionStateMessage = 'Description is required';
            } else this.descriptionState = true;
            return this.nameState || this.descriptionState;
        },
        handleOk (bvModalEvt) {
            bvModalEvt.preventDefault();
            this.handleSubmit();
        },
        resetModal () {
            this.createName = '';
            this.createDescription = '';
            this.nameState = null;
            this.descriptionState = null;
        },
        handleSubmit () {
            if (this.checkFormValidity()) {
                updateCommand(this.$store.state.settings.token, this.$store.state.settings.proxyURL, this.$store.state.application.id, this.$store.state.settings.guildID, {
                    name: this.createName,
                    description: this.createDescription,
                    type: 1
                }).then(() => {
                    // clear commands list
                    this.$store.commit('SET_COMMANDS', []);
                });
                // Hide the modal manually
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing');
                });
            }
        },
        openSubCommand () {
            this.showCreateModal = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.card {
    margin-top: 20px;
    min-height: 140px;
    cursor: pointer;
    background-color: #7289DA;
}
.card-footer-item {
    background-color: #23272A;
}
.card-header {
    background-color: #23272A;
}
.card-body {
    background-color: #2C2F33;
}
</style>
