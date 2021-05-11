<template>
  <v-card
    class="mx-auto GetItems"
    max-width="400"
    title
    v-if="items.length"
  >
    <v-list-item two-line v-for="item in items" :key="item.itemId">
      <v-list-item-content >
        <v-list-item-title>
          <input v-if="item.done" type="checkbox" checked="checked" @click="updateItem(item.itemId, false)">
          <input v-else type="checkbox" @click="updateItem(item.itemId, true)">
          {{ item.name }}
          
          </v-list-item-title>
        <v-list-item-subtitle>Date: {{ item.dueDate }}</v-list-item-subtitle>
        <v-container>
          <v-row>
            <ImageLoad v-if="item.attachmentUrl" v-bind:attachmentUrl=item.attachmentUrl></ImageLoad>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-list-item-icon>
              <router-link style="text-decoration: none; color: inherit;"
                :to="{name: 'ImageUpload', params: {itemId: item.itemId}}">
                <v-icon
                >fas fa-edit</v-icon>
              </router-link>
              <v-icon
                @click.prevent="deleteItem(item.itemId)"
              >fas fa-trash-alt</v-icon>
            </v-list-item-icon>
          </v-row>
        </v-container>
        <v-divider></v-divider>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { apiBaseUrl, stage} from '../config.json'
const url = apiBaseUrl + `/${stage}/items`
import ImageLoad from './ImageLoad.vue'
export default {
  name: 'GetItems',
  components: {
    ImageLoad
  },
  data () {
    return {
      items: null,
      token: '',
      targetImage: ''
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
    this.items.sort();
  },
  methods:{
    async deleteItem(itemId){
      const deleteurl = apiBaseUrl + `/${stage}/item/` + itemId

      await axios.delete(deleteurl, {
        headers: {
          Authorization: `Bearer ${this.token}`    // send the access token through the 'Authorization' header
        } 
      })
      //this.items.pop();
      location.reload();
    },
    async updateItem(itemId, done){
      const updateurl = apiBaseUrl + `/${stage}/item/` + itemId
      await axios.patch(updateurl, {
        done: done
      },{
        headers: {
          Authorization: `Bearer ${this.token}`    // send the access token through the 'Authorization' header
        },
      });
    },
    async encodeImg(base64Url){
      this.targetImage = ''
      const res = await this.getImageData(base64Url)
      this.targetImage = res.data.data.toString()
      console.log(this.targetImage)
    },
    getImageData(base64url){
      return axios.get(base64url)
    }
  },
  computed: {
  }
}
</script>