<template>
  <v-container class="fill-height">
    <div v-if="$fetchState.pending" class="mx-auto text-center">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <v-row v-else justify="center" align="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-check</v-icon>
            Sukses
          </v-card-title>
          <v-card-text> Konfirmasi email berhasil. </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  async fetch() {
    try {
      await this.$axios.post('confirmregistration', {
        token: this.$route.query.token,
      })
      if (this.$auth.loggedIn) {
        await this.$auth.fetchUser()
      }
    } catch (error) {
      this.$nuxt.error({
        statusCode: 404,
        message: 'Halaman tidak ditemukan.',
      })
    }
  },
}
</script>
