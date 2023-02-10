<template>
  <div class="weather-box">
    <div class="weather-box__header">
      <h2>{{ city.name }}</h2>
    </div>
    <div class="weather-box__main">
      <el-icon :size="40"><component :is="icon" /> </el-icon>
      <span>{{ Math.round(city.main.temp) }}&#176;C</span>
    </div>
    <span>Ощущается, как: {{ Math.round(city.main.feels_like) }}&#176;C</span>
    <div class="weather-box__feels">
      <el-icon :size="15"><Rank /></el-icon>
      <span>скорость ветка: {{ city.wind.speed }}м/с</span>
    </div>
    <div class="weather-box__min-max">
      <span>Мин: {{ Math.round(city.main.temp_min) }}&#176;C</span>
      <span>Макс: {{ Math.round(city.main.temp_max) }}&#176;C</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ICityWearher } from "../types";
import { Sunny, Cloudy, Ship } from "@element-plus/icons-vue";

const props = defineProps<{
  city: ICityWearher;
  settings: Boolean;
}>();

const icon = computed(() => {
  if (props.city.clouds.all >= 50) {
    return weatherTypes.Cloudy;
  }
  if (props.city.clouds.all < 50) {
    return weatherTypes.Sunny;
  }
  return weatherTypes.Ship;
});
const weatherTypes = {
  Sunny,
  Cloudy,
  Ship,
};
</script>

<style scoped>
.weather-box__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.weather-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
  height: 185px;
}
.weather-box__main,
.weather-box__feels,
.weather-box__min-max {
  display: flex;
  align-items: center;
  gap: 10px;
}

.weather-box__main {
  font-size: 20px;
}
</style>
