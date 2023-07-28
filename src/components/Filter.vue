<template>
  <div class="filter">
    <p>{{ filterTitle }}</p>
    <v-select
      v-model="value"
      :items="items"
      density="compact"
      single-line
      variant="solo"
    ></v-select>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['filterTitle', 'items', 'modelValue']);
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

<style scoped>
.filter {
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
