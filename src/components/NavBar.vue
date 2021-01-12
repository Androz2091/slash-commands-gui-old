<template>
    <div>
        <b-navbar>
            <template slot="brand">
                <b-navbar-item>
                    <h3>Slash Commands GUI</h3>
                </b-navbar-item>
            </template>
            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <a class="button is-primary" href="https://androz2091.fr/discord">
                            <strong>Discord</strong>
                        </a>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'NavBar'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
    color: white;
}
.navbar {
    background-color: #7289DA;
}
</style>
