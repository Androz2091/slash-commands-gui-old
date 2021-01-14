<template>
    <div>
        <b-container v-if="loading">
            <div class="ball-pulse smallBall vertical-center" style="text-align: center;">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </b-container>
        <Gui v-else />
    </div>
</template>

<script>
import { fetchCommands } from '../api';
import Gui from '../components/Gui.vue';

export default {
    name: 'Home',
    data () {
        return {
            loading: true
        };
    },
    mounted () {
        fetchCommands(this.$store.state.settings.token, this.$store.state.settings.proxyURL, this.$store.state.application.id, this.$store.state.settings.guildID).then((commands) => {
            this.$store.dispatch('setCommands', commands);
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        });
    },
    components: {
        Gui
    }
};
</script>

<style lang="scss">
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
