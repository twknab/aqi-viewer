<script lang="ts">
import UserService from "../../services/UserService";
export default {
  name: "RegisterButton",
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    submit() {
      // Reset any existing error messages
      this.$emit("validationError", {});
      UserService.registerUser(this.user)
        .then(() => {
          this.$router.push({ name: "dashboard" });
        })
        .catch((errors) => {
          this.$emit("validationError", errors.response.data);
        });
    },
    redirectHome() {
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <div class="btn-group mt-3" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-primary btn-lg" @click="submit">
      Register
    </button>
    <button
      type="button"
      class="btn btn-secondary btn-lg"
      @click="redirectHome"
    >
      Nevermind
    </button>
  </div>
</template>
