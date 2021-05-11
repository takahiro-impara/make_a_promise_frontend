<template>
  <v-card
  class="mx-auto"
  max-width="500"
  title
>
    <v-file-input
    accept="image/png, image/jpeg, image/bmp"
    placeholder="Image Upload"
    prepend-icon="mdi-file"
    label="File input"
    @change="FileSelected"
  ></v-file-input>
    <v-btn
      class="mr-4"
      color="success"
      @click="UploadFile"
      type="submit"
    >
      Upload
    </v-btn>
  </v-card>
</template>
<script>
import axios from 'axios'

import { apiBaseUrl, stage} from '../config.json'

const url = apiBaseUrl + `/${stage}/item/`
export default {
  name: 'ImageUpload',
  data: function() {
return {
    file_binary: null
  };
},
  props: [
    "itemId"
  ],
  methods: {
    async FileSelected(file) {
      const reader = new FileReader();
      reader.onload = () => {
        reader.result;
        this.file_url = reader.result
      }
      reader.readAsDataURL(file)
    },
    async getAttachmentUrl() {
      const presignedurl = url + this.itemId + '/attachment'
      this.token = await this.$auth.getTokenSilently();
      console.log(this.token)
      const { data } = await axios.post(presignedurl, {
      },{
        headers: {
          Authorization: `Bearer ${this.token}`    // send the access token through the 'Authorization' header
        },
      });
      if(data.uploadUrl){
        return data.uploadUrl
      }else{
        console.error("could not get Attachment URL")
      }
    },
    async UploadFile() {
      const uploadUrl = await this.getAttachmentUrl();
      try {
        await axios.put(uploadUrl,{
          data: this.file_url
        },{
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        console.log("file uploaded")
        location.href="/";
      } catch(e) {
        console.error(e)
      }

    }
  }
}
</script>