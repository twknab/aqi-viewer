<script lang="ts">
import UserService from "../../services/UserService";
export default {
  name: "LogoutButton",
  methods: {
    logout() {
      UserService.logoffUser()
        .then(() => {
          this.$router.push({ name: "home", params: { logout: true } });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<template>
  <button
    type="button"
    class="btn btn-secondary btn-lg float-end"
    @click="logout"
  >
    🏃 Logout
  </button>
</template>
