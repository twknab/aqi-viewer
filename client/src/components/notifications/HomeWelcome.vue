<script lang="ts">
export default {
  name: "HomeWelcome",
  data() {
    return {};
  },
};
</script>
<template>
  <div class="container-sm">
    <div
      class="alert alert-primary d-flex align-items-center mt-3"
      role="alert"
    >
      <i class="bi bi-info-circle-fill"></i>
      <div>
        Don't have an account?
        <router-link to="/register" class="alert-link">Register</router-link>
        to get started!
      </div>
    </div>
  </div>
</template>
