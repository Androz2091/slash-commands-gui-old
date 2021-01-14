<template>
    <b-card text-variant="white" :header="'/'+name" class="text-center" @click="openCommandConfig">
        <b-card-text>{{ description }}</b-card-text>
    </b-card>
</template>

<script>
export default {
    name: 'SlashCommand',
    props: {
        name: String,
        description: String,
        id: String,
        options: Array
    },
    methods: {
        openCommandConfig () {
            this.$router.push(`/commands/${this.id}`);
        }
    }
};
</script>

<style lang="scss" scoped>
.card {
    margin-top: 20px;
    min-height: 140px;
    cursor: pointer;
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
