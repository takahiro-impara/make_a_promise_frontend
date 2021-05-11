<template>
<div class="Home">
  <div v-if="$auth.isAuthenticated">
    <v-container
    >
    <v-row>
      <v-col
        md="12"
        offset-md="5"
      >
        <v-btn
          color="success"
          elevation="2"
          large
          class="btn btn-primary btn-block"
          href="/item"
        >
          Create Item
        </v-btn>      
      </v-col>
    </v-row>
    </v-container>
    <get-items/>
  </div>
</div>

</template>

<script>
import GetItems from '../components/GetItems.vue'

  export default {
    name: 'Home',
    components: {
      GetItems,
    },
  }
</script>
