<script lang="ts">
import RegisterButton from "./buttons/RegisterButton.vue";
import ValidationErrors from "./ValidationErrors.vue";
export default {
  name: "RegisterUser",
  components: {
    RegisterButton,
    ValidationErrors,
  },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    onValidationError(errors: Record<string, unknown>) {
      let err = {};
      for (const key in errors) {
        const message = errors[key]["message"];
        err[key] = message;
      }
      this.errors = err;
    },
  },
};
</script>

<template>
  <div class="container-sm mt-3">
    <h1 class="mb-4">Register a New User</h1>
    <ValidationErrors :errors="errors" />
    <!-- Registration Form -->
    <div class="mb-3">
      <input
        type="text"
        class="form-control form-control-lg"
        placeholder="First Name"
        v-model="user.firstName"
      />
    </div>
    <div class="mb-3">
      <input
        type="text"
        class="form-control form-control-lg"
        placeholder="Last Name"
        v-model="user.lastName"
      />
    </div>
    <div class="mb-3">
      <input
        type="email"
        class="form-control form-control-lg"
        placeholder="Email"
        v-model="user.email"
      />
    </div>
    <div class="mb-3">
      <input
        type="password"
        class="form-control form-control-lg"
        placeholder="Password"
        v-model="user.password"
      />
    </div>
    <RegisterButton :user="this.user" @validationError="onValidationError" />
  </div>
</template>
