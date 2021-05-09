<template>
  <div class="GetItems">
    <ul class="GetItems">
      <li v-for="item in items" :key="item.name">
        {{ item }}
      </li>
    </ul>
  </div>

</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { apiBaseUrl, stage} from '../config.json'

const url = apiBaseUrl + `/${stage}/items`
export default {
  name: 'callApi',
  data () {
    return {
      items: null,
      token: ''
    }
  },
  async mounted() {
    // Get the access token from the auth wrapper
    this.token = await this.$auth.getTokenSilently();
    // Use Axios to make a call to the API
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.token}`    // send the access token through the 'Authorization' header
      }
    });
    console.log(this.token)
    this.items = data.items;
  }
}
</script>
