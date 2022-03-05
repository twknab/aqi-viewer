<script lang="ts">
export default {
  name: "AirQualityViewer",
  props: {
    aqi: {
      type: Number,
    },
    limit: {
      type: Number,
    },
    foundCity: {
      type: String,
    },
  },
  data() {
    return {
      aqiColor: "none",
    };
  },
  watch: {
    aqi() {
      this.updateColorAQI();
    },
  },
  beforeMount() {
    this.updateColorAQI();
  },
  computed: {
    getDeductionAQIThreshold() {
      const difference = this.aqi - this.limit;
      let message;
      if (difference >= 1) {
        message = `Over Treshold Limit 🔴`;
      } else if (difference < 0) {
        message = `Under Threshold Limit 🟢`;
      } else {
        message = `At Threshold Limit 🟠`;
      }
      return message;
    },
  },
  methods: {
    updateColorAQI() {
      const colors = {
        default: "none",
        green: "#0dfd78",
        yellow: "#fdd40d",
        orange: "#FF7E01",
        red: "#ff2222",
        purple: "#ee56ff",
        maroon: "#c17171",
      };
      const aqiVal = this.aqi;
      if (aqiVal < 50) {
        this.aqiColor = colors.green;
      } else if (aqiVal > 50 && aqiVal <= 100) {
        this.aqiColor = colors.yellow;
      } else if (aqiVal > 100 && aqiVal <= 150) {
        this.aqiColor = colors.orange;
      } else if (aqiVal > 150 && aqiVal <= 200) {
        this.aqiColor = colors.red;
      } else if (aqiVal > 200 && aqiVal <= 300) {
        this.aqiColor = colors.purple;
      } else if (aqiVal > 300) {
        this.aqiColor = colors.maroon;
      } else {
        this.aqiColor = colors.default;
      }
    },
  },
};
</script>
<template>
  <div class="col-md-6 mt-3 mb-3 text-center result-text-shadow">
    <fieldset id="aqi-result" class="mb-3">
      <legend class="aqi">AQI</legend>
      <h1 id="aqi-value">{{ aqi }}</h1>
      <span class="aqi">{{ this.foundCity }}</span>
    </fieldset>
  </div>
  <div class="col-md-6 mt-3 mb-3 text-center result-text-shadow">
    <fieldset
      id="limit-comparison"
      class="mb-3"
      v-if="this.limit || this.limit >= 0"
    >
      <legend class="aqi">Limit</legend>
      <h2 id="limit-value">{{ limit }}</h2>
      <span class="aqi limit-comparison">
        {{ getDeductionAQIThreshold }}
      </span>
    </fieldset>
  </div>
</template>
<style scoped>
#aqi-result {
  color: v-bind(aqiColor);
}
</style>
