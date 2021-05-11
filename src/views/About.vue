<template>
  <div class="about">
    <button @click="callApi">Call</button>
    <p>{{ res }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

const url = "https://50h1yyjmc9.execute-api.ap-northeast-1.amazonaws.com/dev/test"

export default {
  name: 'About',
  data () {
    return {
      res: null,
      token: ''
    }
  },
  methods: {
    async callApi() {
      // Get the access token from the auth wrapper
      this.token = await this.$auth.getTokenSilently();
      // Use Axios to make a call to the API
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.token}`    // send the access token through the 'Authorization' header
        }
      });
      console.log(this.token)
      this.res = data;
    }
  }
}
</script>
