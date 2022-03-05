<script lang="ts">
export default {
  name: "ThresholdLimit",
  data() {
    return {};
  },
  props: {
    limit: {
      type: Number,
    },
  },
};
</script>
<template>
  <div class="col-md-6 mt-3 text-center">
    <div class="mb-3">
      <input
        type="number"
        max="500"
        min="0"
        class="form-control form-control-lg"
        placeholder="Enter your Threshold Limit"
        :value="limit"
        @input="this.$emit('updateLimit', Number($event.target.value))"
      />
    </div>
  </div>
</template>
