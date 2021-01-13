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
                    :invalid-feedback="nameState"
                    :state="nameStateEnabled"
                >
                <b-form-input
                    v-model="createName"
                    :state="nameStateEnabled"
                    required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                    label="Description"
                    label-for="name-input"
                    :invalid-feedback="descriptionState"
                    :state="descriptionStateEnabled"
                >
                <b-form-input
                    v-model="createDescription"
                    :state="descriptionStateEnabled"
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
            nameState: '',
            descriptionState: '',
            nameStateEnabled: null,
            descriptionStateEnabled: null,
            showCreateModal: false
        };
    },
    watch: {
        createName () {
            this.checkFormValidityName();
        },
        createDescription () {
            this.checkFormValidityDescription();
        }
    },
    methods: {
        checkFormValidityName () {
            const nameEmpty = this.createName.length < 1;
            const nameExists = this.$store.state.commands.some((cmd) => cmd.name === this.createName);
            this.nameStateEnabled = !(nameEmpty || nameExists);
            // eslint-disable-next-line no-nested-ternary
            this.nameState = nameEmpty ? 'Name is required' : nameExists ? 'This command already exists' : null;
            return this.nameStateEnabled;
        },
        checkFormValidityDescription () {
            const descriptionEmpty = this.createDescription.length < 1;
            this.descriptionStateEnabled = !descriptionEmpty;
            this.descriptionState = descriptionEmpty ? 'Description is required' : null;
            return this.descriptionStateEnabled;
        },
        handleOk (bvModalEvt) {
            bvModalEvt.preventDefault();
            this.handleSubmit();
        },
        resetModal () {
            this.createName = '';
            this.createDescription = '';
            this.nameState = null;
        },
        handleSubmit () {
            // Exit when the form isn't valid
            if (!this.checkFormValidityName() && !this.checkFormValidityDescription()) {
                return;
            }
            this.$store.dispatch('createCommand', {
                name: this.createName,
                description: this.createDescription
            });
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing');
            });
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
};
.card {
    margin-top: 20px;
    min-height: 140px;
    cursor: pointer;
    background-color: #7289DA;
}
.card-footer-item {
    background-color: #23272A;
};
.card-header {
    background-color: #23272A;
};
.card-body {
    background-color: #2C2F33;
};
</style>
