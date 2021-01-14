<template>
    <div>
        <b-container v-if="loading">
            <div class="ball-pulse smallBall vertical-center" style="text-align: center;">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            loading: true
        };
    },
    components: {
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
