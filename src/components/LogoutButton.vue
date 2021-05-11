<template>
  <v-btn
    color="error"
    elevation="2"
    medium
    class="btn btn-danger btn-block"
    v-if="$auth.isAuthenticated"
    @click.prevent="logout"
  >
    Log Out
  </v-btn>
</template>

<script>
export default {
  name: "LogoutButton",
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push({ path: "/" });
    },
  },
};
</script>