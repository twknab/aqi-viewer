<script lang="ts">
export default {
  name: "NavigationBar",
};
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#primaryNavigation"
        aria-controls="primaryNavigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="primaryNavigation">
        <a class="navbar-brand" href="#">AirQuality Viewer 💨</a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active">Home</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
