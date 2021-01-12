<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                /{{ name }}
            </p>
        </header>
        <div class="card-content">
            <div class="content">
            {{ description }}
            </div>
        </div>
        <footer class="card-footer">
            <a href="#" class="card-footer-item" style="color: red;">Delete</a>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'SlashCommand',
    props: {
        name: String,
        description: String
    }
};
</script>

<style lang="scss" scoped>
.card-footer {
    border-top: 0 !important;
};
.card-footer-item {
    background-color: #23272A;
};
.card-header-title {
    color: white;
    background-color: #23272A;
};
.card-content {
    background-color: #2C2F33;
    color: white;
};
.card {
    border-radius: 0%;
};
</style>
