<template>
  <div class="search-bar">
    <v-text-field
      label="Search a movie..."
      append-inner-icon="mdi-magnify"
      @click:append-inner="props.searchByQueryField"
      single-line
      hide-details
      variant="solo"
      v-model="value"
      clearable
    >
    </v-text-field>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['modelValue', 'searchByQueryField']);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss" scoped>
.search-bar {
  padding: 2rem 0 0 0;
}
</style>
