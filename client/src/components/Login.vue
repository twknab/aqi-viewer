<script lang="ts">
import LoginButton from "./buttons/LoginButton.vue";
import ValidationErrors from "./ValidationErrors.vue";
export default {
  name: "LoginUser",
  components: {
    LoginButton,
    ValidationErrors,
  },
  methods: {
    onValidationError(errors: Record<string, unknown>) {
      this.errors = errors;
    },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {},
    };
  },
};
</script>

<template>
  <div class="container-sm mt-3">
    <h1 class="mb-4">Login</h1>
    <ValidationErrors :errors="errors" />
    <!-- Login Form -->
    <div class="mb-3">
      <input
        type="email"
        class="form-control form-control-lg"
        placeholder="user@email.com"
        v-model="user.email"
      />
    </div>
    <div class="mb-3">
      <input
        type="password"
        class="form-control form-control-lg"
        v-model="user.password"
        placeholder="password"
      />
    </div>
    <LoginButton :user="this.user" @validationError="onValidationError" />
  </div>
</template>
