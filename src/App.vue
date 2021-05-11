<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-icon @click="home">fas fa-home</v-icon>
      </div>

      <v-spacer></v-spacer>
      <LogoutButton v-if="$auth.isAuthenticated" />
      <LoginButton v-else />

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    LoginButton,
    LogoutButton,
  },
  methods: {
    home() {
      location.href="/";
    }
  }
};
</script>
