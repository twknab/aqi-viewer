<script lang="ts">
export default {
  name: "SearchLocation",
  data() {
    return {};
  },
  props: {
    city: {
      type: String,
    },
  },
};
</script>
<template>
  <div class="col-md-6 mt-3 text-center">
    <div class="mb-3">
      <input
        type="text"
        class="form-control form-control-lg"
        placeholder="Enter your City"
        name="city"
        :value="city"
        @input="this.$emit('updateLocation', $event.target.value)"
      />
    </div>
  </div>
</template>
