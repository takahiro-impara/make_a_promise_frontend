<template>
  <v-card
    class="mx-auto"
    max-width="500"
    title
  >
  <v-content>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :counter="20"
        label="Name"
        required
      ></v-text-field>

      <v-text-field 
        v-model="dueDate" 
        single-line
        label="dueDate"
        required
        >
        <template v-slot:append-outer>
          <date-picker v-model="dueDate"/>
        </template>
      </v-text-field>

      <v-btn
        class="mr-4"
        color="success"
        @click="createItem"
      >
        Create
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </v-form>
  </v-content>

  </v-card>
</template>

<script>
import axios from 'axios'

import DatePicker from "../components/DatePicker";
import { apiBaseUrl, stage} from '../config.json'

const url = apiBaseUrl + `/${stage}/item`
export default {
  name: 'CreateItem',
  data () {
    return {
      res: null,
      token: '',
      dueDate: '',
      name: ''
    }
  },
  components: {
    DatePicker
  },
  methods: {
    async createItem() {
      // Get the access token from the auth wrapper
      if(this.validateDate() === false){
        return console.error("input date is not valid");
      }
      this.token = await this.$auth.getTokenSilently();
      // Use Axios to make a call to the API
      const { data } = await axios.post(url, {
        name: this.name,
        dueDate: this.dueDate
      },{
        headers: {
          Authorization: `Bearer ${this.token}`    // send the access token through the 'Authorization' header
        },
      });
      this.res = data;
      location.href="/";
    },
    clear(){
      this.name = ""
      this.dueDate = ""
    },
    validateDate(){
      const dateformat = /^(\d{4})-(0?[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g;
      if (this.dueDate.match(dateformat)){
        return true
      }else {
        return false
      }
    }
  }
}
</script>
