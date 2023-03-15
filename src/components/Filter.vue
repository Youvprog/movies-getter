<template>
    <div class="search-bar">
        <v-text-field
            :value="query"
            @input="$emit('update:query', $event.target.value)"
            label="Search a movie..."
            append-inner-icon="mdi-magnify"
            @click:append-inner="console.log('hello')"
            single-line
            hide-details
            variant="solo"
        >
        </v-text-field>
    </div>
    <div class="filters">
        <div class="filter">
            <p>{{filters[0].type}}</p>
            <v-select
                v-model="quality"
                @change="$emit('update:quality', $event.target.value)"
                :items="filters[0].items"
                density="compact"
                single-line
                variant="solo"
            ></v-select>
        </div>
        <div class="filter">
            <p>{{filters[1].type}}</p>
            <v-select
                :value="genre"
                @input="$emit('update:genre', $event.target.value)"
                :items="filters[1].items"
                density="compact"
                single-line
                variant="solo"
            ></v-select>
        </div>
        <div class="filter">
            <p>{{filters[2].type}}</p>
            <v-select
                :value="rating"
                @input="$emit('update:rating', $event.target.value)"
                :items="filters[2].items"
                density="compact"
                single-line
                variant="solo"
            ></v-select>
        </div>
        <div class="filter">
            <p>Order by</p>
            <v-select
                :value="sort"
                @input="$emit('update:sort', $event.target.value)"
                :items="filters[3].items"
                density="compact"
                single-line
                variant="solo"
            ></v-select>
        </div>
        
    </div>
    <div class="filter-btn">
        <v-btn 
            color="primary"
            variant="outlined"
            @click="$emit('filter')"
            >Apply
        </v-btn>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    filters: Array,
    query: String,
    quality: String,
    genre: String,
    rating: Number,
    sort: String
})

const emits = defineEmits(['update:query','update:quality','update:genre','update:rating','update:sort','filter'])

const quality = ref('')


</script>

<style scoped>
.search-bar {
    padding: 2rem 0 0 0;
}
.filters {
    display: flex;
    justify-content: space-between;
}
.filter {
    width: 150px;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}
.filter-btn {
    display: flex;
    justify-content: center;
}
</style>