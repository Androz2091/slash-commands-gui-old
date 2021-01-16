<template>
    <div class="create-param" @click="createParam">coucou</div>
</template>

<script>
export default {
    name: 'SlashCommandCreateParam',
    methods: {
        createParam () {

        }
    }
};
</script>

<style lang="scss" scoped>
.text-discord {
    color: #7289DA;
}

.create-param {
    border-radius: inherit;
    cursor: pointer;

    align-items: center !important;
    text-align: center;

    margin-right: 10px;
    margin-top: 10px;

    width: calc(80%);
    white-space: nowrap;
    text-overflow: ellipsis;

    padding: 0.75rem 1.25rem 0.75rem 0.75rem;
    background-color: #2C2F33;
    border: 1px solid white;

    color: white;
}
</style>
