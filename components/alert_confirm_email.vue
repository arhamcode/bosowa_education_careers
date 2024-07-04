<template>
  <v-alert
    v-if="!$auth.user.emailConfirm"
    type="warning"
    icon="mdi-email"
    border="left"
    prominent
  >
    Mohon periksa inbox atau spam box pada email Anda untuk melakukan konfirmasi
    email. Jika belum menerima email konfirmasi silahkan klik link berikut
    <v-btn
      class="ml-1"
      small
      color="primary"
      :loading="loading"
      @click="resendEmailConfirmation"
    >
      <v-icon class="mr-2" small>mdi-send</v-icon>
      Kirim
    </v-btn>
    <arham-dialog ref="dialog" />
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async resendEmailConfirmation() {
      try {
        this.loading = true
        await this.$axios.get('/resendemailconfirmation')
        this.$refs.dialog.open({
          title: 'Sukses',
          message:
            'Email konfirmasi berhasil terkirim, silahkan periksa inbox atau spam box Anda.',
          closeButton: false,
        })
      } catch (error) {
        this.$refs.dialog.open({
          title: 'Gagal',
          message:
            'Email konfirmasi gagal terkirim, silahkan coba beberapa saat lagi.',
          closeButton: false,
          type: 'warning',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
