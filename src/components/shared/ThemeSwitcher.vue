<script setup>
import { useCycleList, useStorage } from "@vueuse/core";
import { watch } from "vue";
import { useTheme } from "vuetify";

const props = defineProps({
  themes: {
    type: Array,
    required: true,
  },
});

const { name: themeName, global: globalTheme } = useTheme();

const {
  state: currentThemeName,
  next: getNextThemeName,
  index: currentThemeIndex,
} = useCycleList(
  props.themes.map((t) => t.name),
  { initialValue: themeName }
);

const changeTheme = () => {
  globalTheme.name.value = getNextThemeName();
  useStorage("theme", globalTheme.name.value);
};

// Update icon if theme is changed from other sources
watch(
  () => globalTheme.name.value,
  (val) => {
    currentThemeName.value = val;
  }
);
</script>

<template>
  <div class="cursor-pointer" @click="changeTheme">
    <VIcon :icon="props.themes[currentThemeIndex].icon" />
    <VTooltip activator="parent" open-delay="1000" scroll-strategy="close">
      <span class="text-capitalize">{{ currentThemeName }}</span>
    </VTooltip>
  </div>
</template>
