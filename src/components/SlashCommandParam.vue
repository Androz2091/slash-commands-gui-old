<template>
    <div class="param" @click="editParam">{{ option.name }}</div>
</template>

<script>
export default {
    name: 'SlashCommandParam',
    props: {
        option: Object
    },
    methods: {
        editParam () {

        }
    }
};
</script>

<style lang="scss" scoped>

.param {
    border-radius: inherit;
    cursor: pointer;

    align-items: center !important;
    text-align: center;

    margin-right: 10px;
    margin-top: 10px;

    max-width: 100px;
    min-width: 100px;

    overflow: hidden;
    width: calc(80%);
    white-space: nowrap;
    text-overflow: ellipsis;

    padding: 0.75rem 1.25rem;
    background-color: #2C2F33;
    border: 1px solid white;

    color: white;
}
</style>
