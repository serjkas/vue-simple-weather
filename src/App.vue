<template>
  <div class="main">
    <el-icon
      v-if="!settingsVisible"
      @click="settingsVisible = true"
      :size="20"
      class="pointer"
      ><Setting
    /></el-icon>
    <div class="container" v-if="userCities.length !== 0">
      <div v-for="(city, index) in cities" :key="city.id">
        <Weather
          :city="city"
          :settings="index === 1"
          @settings="settingsVisible = true"
        />
      </div>
      <div>
        <settings
          :visible="settingsVisible"
          :cities-array="userCities"
          @close="settingsVisible = false"
          @change="changeCities"
        />
      </div>
    </div>
    <div v-else class="first-choise">
      <el-input v-model="firstChoise" placeholder="Напишите город" />
      <el-button @click="getWeather({ city: firstChoise, first: true })"
        >Ок</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Settings from "./components/Settings.vue";
import Weather from "./components/Weather.vue";
import { useGetCityById } from "./controls";
import { ICityWearher } from "./types";

let cities = reactive<ICityWearher[]>([]);
const userCities = ref<string[]>([]);
const firstChoise = ref<string>("");
const settingsVisible = ref<Boolean>(false);

const changeCities = async (chagneCities: string[]) => {
  let citiesToUpdate: string[] = [];
  if (chagneCities.length > userCities.value.length) {
    citiesToUpdate = chagneCities.filter(
      (item) => !userCities.value.includes(item)
    );
  } else {
    citiesToUpdate = chagneCities.filter((item) =>
      userCities.value.includes(item)
    );
    cities = cities.filter((item) => citiesToUpdate.includes(item.name));
  }

  userCities.value = chagneCities;

  for (let cityName of citiesToUpdate) {
    await getWeather({ city: cityName });
  }
};

const getWeather = async ({
  city,
  first,
}: {
  city: string;
  first?: Boolean;
}) => {
  const response = await useGetCityById(city);

  cities.push(response.data);
  if (first) {
    userCities.value.push(city);
  }
};
</script>

<style src="./style.css"></style>
