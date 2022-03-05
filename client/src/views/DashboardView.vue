<script lang="ts">
import UserService from "../services/UserService";
import WeatherService from "../services/WeatherService";
import LogoutButton from "../components/buttons/LogoutButton.vue";
import DashboardWelcome from "../components/notifications/DashboardWelcome.vue";
import AirQualityViewer from "../components/AirQualityViewer.vue";
import SearchLocation from "../components/SearchLocation.vue";
import ThresholdLimit from "../components/ThresholdLimit.vue";
import ValidationErrors from "../components/ValidationErrors.vue";
export default {
  data() {
    return {
      user: {},
      errors: {},
      aqi: null,
      limit: null,
      foundCity: "",
    };
  },
  components: {
    LogoutButton,
    DashboardWelcome,
    AirQualityViewer,
    SearchLocation,
    ThresholdLimit,
    ValidationErrors,
  },
  beforeMount() {
    this.getLoggedInUser();
  },
  computed: {
    getHasCityAndLimitSet() {
      return this.user.city || this.user.limit >= 0;
    },
  },
  methods: {
    getLoggedInUser() {
      UserService.getLoggedInUser()
        .then((user) => {
          this.user = user.data;
          // Get AQI data for user following login
          if (this.user.city !== undefined && this.user.limit !== undefined)
            this.getAQIData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAQIData() {
      WeatherService.getAQI({ city: this.user.city })
        .then((data) => {
          const apiData = data.data;
          if (apiData.status === "error") {
            this.onValidationError({
              invalid:
                "City not found, please try another location or ensure correct spelling.",
            });
            return;
          }
          this.updateAndSaveUserData(apiData);
        })
        .catch((err) => {
          console.log("Something went wrong fetching weather data");
          console.log(err);
        });
    },
    updateAndSaveUserData(apiData: Record<string, unknown>) {
      this.aqi = apiData.data["aqi"];
      this.limit = this.user.limit;
      this.foundCity = apiData.data["city"]["name"];
      UserService.updateUser({
        city: this.user.city,
        limit: this.user.limit,
      })
        .then(() => {
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onUpdateLocation(newCity: string) {
      this.user.city = newCity;
    },
    onUpdateLimit(newLimit: number) {
      this.user.limit = newLimit;
    },
    validateAndFetchAPIData() {
      // Reset any errors
      this.errors = {};
      if (!this.user.city || (!this.user.limit && this.user.limit !== 0)) {
        this.onValidationError({
          invalid: "Enter both a city and a threshold.",
        });
        return;
      }
      if (this.user.limit < 0 || this.user.limit > 500) {
        this.onValidationError({
          invalid: "Limit must be between 0-500.",
        });
        return;
      }
      this.getAQIData();
    },
    onValidationError(errors: Record<string, unknown>) {
      console.log(errors);
      this.errors = errors;
    },
  },
};
</script>

<template>
  <div class="container-sm mt-3">
    <LogoutButton />
    <h1>Dashboard</h1>
    <DashboardWelcome
      :firstName="this.user.firstName"
      v-if="!getHasCityAndLimitSet"
    />
    <ValidationErrors :errors="this.errors" class="mt-4" />
    <div class="row align-items-center">
      <AirQualityViewer
        :limit="this.limit"
        :aqi="this.aqi"
        :foundCity="this.foundCity"
        v-if="this.limit !== null && this.aqi !== null"
      />
    </div>
    <div class="row">
      <SearchLocation
        :city="this.user.city"
        @updateLocation="onUpdateLocation"
        @validationError="onValidationError"
      />
      <ThresholdLimit
        :limit="this.user.limit"
        @updateLimit="onUpdateLimit"
        @validationError="onValidationError"
      />
    </div>
    <div class="row">
      <div class="d-grid gap-2">
        <button
          type="button"
          class="btn btn-primary btn-lg mb-3 mt-3"
          @click="validateAndFetchAPIData"
        >
          🎚 Update Results!
        </button>
      </div>
      <div class="col-md-12 mt-3 text-center"></div>
    </div>
    <a
      id="airnow-link"
      class="btn btn-link btn-lg"
      href="https://www.airnow.gov/aqi/aqi-basics/"
      target="_blank"
    >
      🔗 Learn More about AQI
    </a>
  </div>
  <a id="byTK" class="mt-3 mb-5" href="https://timknab.dev" target="_blank"
    >by timknab</a
  >
</template>
