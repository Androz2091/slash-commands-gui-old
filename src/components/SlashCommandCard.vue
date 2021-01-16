<template>
    <b-card text-variant="white" :header="'/'+name" class="text-center clickable-card" @click="openCommandConfig">
        <b-card-text>{{ description }}</b-card-text>
    </b-card>
</template>

<script>
export default {
    name: 'SlashCommandCard',
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
