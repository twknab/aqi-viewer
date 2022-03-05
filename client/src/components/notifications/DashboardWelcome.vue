<script lang="ts">
export default {
  name: "DashboardWelcome",
  props: {
    firstName: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div
    class="alert alert-primary d-flex align-items-center mt-3 alert-dismissible fade show mt-5"
    role="alert"
  >
    <i class="bi bi-info-circle-fill"></i>
    <div>
      <b class="welcome-highlight">Welcome {{ firstName }}!</b> Please set your
      <b class="welcome-highlight"> city</b> and air quality
      <b class="welcome-highlight">threshold limit</b> to get started!
    </div>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>
