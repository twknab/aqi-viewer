<script lang="ts">
import UserService from "../../services/UserService";
export default {
  name: "LoginButton",
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    login() {
      // Reset any existing errors
      this.$emit("validationError", {});
      UserService.loginUser(this.user)
        .then(() => {
          this.$router.push({ name: "dashboard" });
        })
        .catch(() => {
          this.$emit("validationError", {
            invalid: "Invalid username or password.",
          });
        });
    },
  },
};
</script>

<template>
  <button type="button" class="btn btn-primary btn-lg mb-3" @click="login">
    🚀 Login
  </button>
</template>
