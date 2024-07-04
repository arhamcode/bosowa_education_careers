<template>
  <div class="text-center mb-2">
    <v-img v-if="imagePreview" max-height="191" contain :src="imagePreview" />
    <v-avatar v-else size="191">
      <v-icon size="191">mdi-account-circle</v-icon>
    </v-avatar>
  </div>
</template>

<script>
export default {
  props: {
    imageFile: {
      type: File,
      default() {
        return null
      },
    },
    imageLink: {
      type: String,
      default() {
        return ''
      },
    },
  },
  computed: {
    imagePreview() {
      if (this.imageFile) {
        return URL.createObjectURL(this.imageFile)
      } else if (this.imageLink) {
        return `https://hris.bosowa.co.id/rest_api_jova/file/avatar?filename=${this.imageLink}`
      } else {
        return null
      }
    },
  },
}
</script>
