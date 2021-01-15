<template>
  <div id="app">
    <NavBar />
    <b-container v-if="loading">
        <div class="ball-pulse smallBall vertical-center" style="text-align: center;">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </b-container>
    <router-view v-else />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import registerSW from './registerServiceWorker';
import { fetchCommands } from './api';

export default {
    name: 'App',
    components: {
        NavBar
    },
    data () {
        return {
            loading: true
        };
    },
    watch: {
        commands () {
            if (this.loading) return;
            this.loading = true;
            this.loadCommands();
        }
    },
    computed: {
        commands () {
            return this.$store.state.commands;
        }
    },
    beforeMount () {
        this.$store.dispatch('loadCache');
        if (
            !this.$store.state.settings.token
            || !this.$store.state.settings.proxyURL
            || !this.$store.state.application
            || !this.$store.state.guild
        ) {
            setTimeout(() => {
                this.loading = false;
                this.$router.push('/settings');
            }, 300);
        } else this.loadCommands();
    },
    mounted () {
        if (window.location.protocol === 'https:') registerSW();
        window.addEventListener('beforeinstallprompt', (e) => {
            this.installPWA.prompt = () => {
                e.prompt();
                e.userChoice.then((rs) => {
                    if (rs.outcome === 'accepted') {
                        if (window.ga) window.ga.logEvent('install');
                        window.location.reload();
                    }
                });
            };
            setTimeout(() => this.installPWA.prompt(), 2000);
        });
    },
    methods: {
        loadCommands () {
            fetchCommands(this.$store.state.settings.token, this.$store.state.settings.proxyURL, this.$store.state.application.id, this.$store.state.settings.guildID).then((commands) => {
                this.$store.dispatch('setCommands', commands);
                setTimeout(() => {
                    this.loading = false;
                }, 1000);
            });
        }
    }
};
</script>

<style lang="scss">
html, body {
    background-color: #2C2F33 !important;
}
* {
    color: white;
}
.modal-title {
    color: black;
}
.d-block {
    color: black;
}
</style>

<style lang="scss" scoped>
.ball-pulse>div:first-child {
    -webkit-animation: scale .75s cubic-bezier(.2, .68, .18, 1.08) -.24s infinite;
    animation: scale .75s cubic-bezier(.2, .68, .18, 1.08) -.24s infinite;
}

.ball-pulse>div:nth-child(2) {
    -webkit-animation: scale .75s cubic-bezier(.2, .68, .18, 1.08) -.12s infinite;
    animation: scale .75s cubic-bezier(.2, .68, .18, 1.08) -.12s infinite;
}

.ball-pulse>div:nth-child(3) {
    -webkit-animation: scale .75s cubic-bezier(.2, .68, .18, 1.08) 0s infinite;
    animation: scale .75s cubic-bezier(.2, .68, .18, 1.08) 0s infinite;
}

.ball-pulse > div {
    background-color: #fff;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    margin-top: 0;
    margin-bottom: -.2rem
}

.vertical-center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.smallBall > div {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin: 1px
}

@-webkit-keyframes scale {
    0% {
        transform: scale(1);
        opacity: 1;
        -ms-filter: none;
        filter: none
    }
    45% {
        transform: scale(.1);
        opacity: .7;
        -ms-filter: "alpha(opacity=70)";
        filter: alpha(opacity=70)
    }
    80% {
        transform: scale(1);
        opacity: 1;
        -ms-filter: none;
        filter: none
    }
}

@keyframes scale {
    0% {
        transform: scale(1);
        opacity: 1;
        -ms-filter: none;
        filter: none
    }
    45% {
        transform: scale(.1);
        opacity: .7;
        -ms-filter: "alpha(opacity=70)";
        filter: alpha(opacity=70)
    }
    80% {
        transform: scale(1);
        opacity: 1;
        -ms-filter: none;
        filter: none
    }
}
</style>
