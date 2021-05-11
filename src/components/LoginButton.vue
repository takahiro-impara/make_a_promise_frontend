<template>
  <v-btn
    color="primary"
    elevation="2"
    medium
    class="btn btn-primary btn-block"
    v-if="!$auth.isAuthenticated"
    @click="login"
  >
    Log In
  </v-btn>
</template>

<script>
export default {
  name: "LoginButton",
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
  },
};
</script>