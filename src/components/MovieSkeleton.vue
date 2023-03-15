<template>
    <div class="card">
        <div class="card2">
            <img src="" alt="">
        </div>
    </div>
    <div class="movie-info">
        <h4 class="movie-title"></h4>
        <h5 class="movie-year"></h5>
    </div>
</template>

<script setup>

</script>

<style scoped>
.card {
    width: 230px;
    height: 345px;
    background-color: dimgray;
    border-radius: 20px;
}
.card2 {
    width: 230px;
    height: 345px;
    background-color: rgb(54, 49, 49);
    border-radius: 20px;
}
.movie-info {
    width: 230px;
    padding-top: 0.3rem;
}
.movie-title {
    width: 130px;
    height: 20px;
    background-color: rgb(54, 49, 49);
    border-radius: 8px;
}
.movie-year {
    width: 50px;
    height: 20px;
    background-color: rgb(54, 49, 49);
    border-radius: 8px;
    margin-top: 0.2rem;
}
</style>