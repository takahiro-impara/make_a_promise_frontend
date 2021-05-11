<template>
  <img :src="targetImage" v-bind:width="resizeWidth" v-bind:height="resizeHeight">
</template>

<script>
import axios from 'axios'

export default {
  name: 'ImageLoad',
  data () {
    return {
      targetImage: '',
      resizeWidth: 200,
      resizeHeight: 200
    }
  },
  props: ["attachmentUrl"],
  async mounted() {
    const res = await axios.get(this.attachmentUrl)
    this.targetImage = res.data.data.toString()
    const dimensions = await this.getImageDimensions(this.targetImage)
    this.resizeImage(dimensions)

  },
  methods: {
    getImageDimensions(file) {
      // eslint-disable-next-line no-unused-vars
      return new Promise (function (resolved, rejected) {
        var i = new Image()
        i.onload = function(){
          resolved({w: i.width, h: i.height})
        };
        i.src = file
      })
    },
    resizeImage(dim){
      const oriWidth = dim.w
      const oriHeight = dim.h
      this.resizeHeight = oriHeight * (this.resizeWidth / oriWidth);
    }
  }
}
</script>