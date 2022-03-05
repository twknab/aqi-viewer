<script setup lang="ts">
import { RouterView } from "vue-router";
import Navigation from "@/components/Navigation.vue";
</script>
<template>
  <Navigation />
  <div class="container-fluid">
    <RouterView />
  </div>
</template>
