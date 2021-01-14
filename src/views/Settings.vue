<template>
    <div>
        <h3 class="title" style="text-align: center;">Slash Commands UI Settings</h3>
        <b-container class="form-container">
            <b-form-group
            id="fieldset-1"
            description="The token of the bot you want to explore slash commands."
            label="Token"
            label-for="input-token"
            :invalid-feedback="tokenStateMessage"
            :state="tokenState"
            >
                <b-form-input id="input-token" v-model="token" :state="tokenState" trim></b-form-input>
            </b-form-group>
            <b-form-group
            id="fieldset-1"
            description="The specific ID of the guild you want to explore slash commands."
            label="Guild ID"
            label-for="input-guild"
            :invalid-feedback="guildIDStateMessage"
            :state="guildIDState"
            >
                <b-form-input id="input-guild" v-model="guildID" :state="guildIDState" trim placeholder="ID of the guild (optional)"></b-form-input>
            </b-form-group>
            <b-form-group
            id="fieldset-1"
            description="The proxy URL used to make requests to Discord and bypass CORS policy (let default)."
            label="Proxy URL (let default)"
            label-for="input-proxy"
            :invalid-feedback="proxyURLStateMessage"
            :state="proxyURLState"
            >
                <b-form-input id="input-proxy" v-model="proxyURL" :state="proxyURLState" trim></b-form-input>
            </b-form-group>
            <b-overlay
                :show="showOverlay"
                rounded
                opacity="0.6"
                spinner-small
                spinner-variant="primary"
                class="d-inline-block"
            >
                <b-button class="bg-discord" @click="handleSubmit">Submit</b-button>
            </b-overlay>
        </b-container>
    </div>
</template>

<script>
import isURL from 'is-url';
import { fetchApplication, fetchGuild } from '../api';

export default {
    name: 'Settings',
    data () {
        return {
            token: '',
            guildID: '',
            proxyURL: '',

            // handle errors
            tokenState: null,
            guildIDState: null,
            proxyURLState: null,

            tokenStateMessage: '',
            guildIDStateMessage: '',
            proxyURLStateMessage: '',

            showOverlay: false
        };
    },
    watch: {
        token () {
            this.checkFormValidity();
        },
        guildID () {
            this.checkFormValidity();
        },
        proxyURL () {
            this.checkFormValidity();
        }
    },
    methods: {
        handleSubmit () {
            const isFormValid = this.checkFormValidity();
            if (isFormValid) {
                this.$store.dispatch('saveSettings', {
                    token: this.token,
                    guildID: this.guildID,
                    proxyURL: this.proxyURL
                });
            }
            this.fetchApplication();
        },
        checkFormValidity () {
            const tokenEmpty = this.token.length === 0;
            if (tokenEmpty) {
                this.tokenState = false;
                this.tokenStateMessage = 'Token is required';
            } else this.tokenState = true;
            /*
            const guildIDEmpty = this.guildID.length === 0;
            if (guildIDEmpty) {
                this.guildIDState = false;
                this.guildIDStateMessage = 'Guild ID is required';
            } else this.guildIDState = true;
            */
            this.guildIDState = true;
            const proxyURLEmpty = this.proxyURL.length === 0;
            const proxyURLInvalid = !isURL(this.proxyURL);
            if (proxyURLEmpty || proxyURLInvalid) {
                this.proxyURLState = false;
                this.proxyURLStateMessage = proxyURLEmpty ? 'Proxy URL is required' : 'Proxy URL is invalid';
            } else this.proxyURLState = true;
            return this.tokenState && this.guildIDState && this.proxyURLState;
        },
        fetchApplication () {
            this.showOverlay = true;
            fetchApplication(this.token, this.proxyURL).then((application) => {
                this.showOverlay = false;
                if (!application) {
                    this.tokenState = false;
                    this.tokenStateMessage = 'Token is invalid';
                } else {
                    fetchGuild(this.token, this.proxyURL, this.guildID).then((guild) => {
                        if (!guild) {
                            this.guildIDState = false;
                            this.guildIDStateMessage = 'Unknown guild';
                        } else {
                            this.$store.dispatch('saveData', {
                                application,
                                guild
                            });
                            this.$store.commit('SET_COMMANDS', []);
                            this.$router.push('/');
                        }
                    });
                }
            });
        }
    },
    beforeMount () {
        this.token = this.$store.state.settings.token || '';
        this.guildID = this.$store.state.settings.guildID || '';
        this.proxyURL = this.$store.state.settings.proxyURL || '';
    }
};
</script>

<style lang="scss" scoped>
* {
    color: white;
}
input {
    color: black !important;
}
.title {
    margin-top: 20px;
};
.center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.form-container {
    margin-top: 50px;
}
.bg-discord {
    background-color: #7289DA;
}
</style>
