<template>
    <div class="create-cmd-opt" @click="createOption">New</div>
</template>

<script>
export default {
    name: 'SlashCommandCreateOption',
    methods: {
        createOption () {

        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.create-cmd-opt {

    color: white;

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
    border: 1px solid $discord-color;

}
</style>
