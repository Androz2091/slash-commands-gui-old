<template>
    <div class="cmd-opt" @click="editOption">{{ option.name }}</div>
</template>

<script>
export default {
    name: 'SlashCommandOptionCard',
    props: {
        option: Object
    },
    methods: {
        editOption () {

        }
    }
};
</script>

<style lang="scss" scoped>
.cmd-opt {
    border-radius: inherit;
    cursor: pointer;

    align-items: center !important;
    text-align: center;

    margin-right: 10px;
    margin-top: 10px;

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
