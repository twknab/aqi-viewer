<script lang="ts">
export default {
  name: "ValidationErrors",
  props: {
    errors: {
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>

<template>
  <div v-if="errors">
    <div
      v-for="err in errors"
      :key="err.id"
      class="alert alert-danger validation-error"
      role="alert"
    >
      {{ err }}
    </div>
  </div>
</template>
