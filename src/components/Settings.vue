<template>
  <div v-if="visible" class="weather-settings">
    <div class="weather-settings__header">
      <h3>Настройки</h3>
      <el-icon class="pointer" @click="emit('close')"><Close /></el-icon>
    </div>
    <div class="weather-settings__select">
      <el-select
        v-model="cities"
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="Впишите город"
        allow-create
        default-first-option
        no-data-text="Введите город и нажмите enter"
        :reserve-keyword="false"
      >
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  WritableComputedRef,
  computed,
} from "vue";

const props = defineProps<{
  visible: Boolean;
  citiesArray: string[];
}>();

const emit = defineEmits(["close", "change"]);

const cities: WritableComputedRef<string[]> = computed({
  get(): string[] {
    return props.citiesArray;
  },
  set(newValue: string[]): void {
    emit("change", newValue);
  },
});
</script>

<style scoped>
.weather-settings {
  width: 200px;
  height: 185px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
}
.weather-settings__header {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
