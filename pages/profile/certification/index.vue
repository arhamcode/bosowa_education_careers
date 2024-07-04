<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-certificate-outline</v-icon>
      Sertifikasi
      <v-spacer />
      <v-btn color="primary" to="/profile/certification/form/add">
        <v-icon class="mr-2">mdi-plus</v-icon>
        Tambah
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-data-table
      :loading="$fetchState.pending"
      :headers="headers"
      :items="certification"
    >
      <template #[`item.cert_name`]="{ item }">
        <nuxt-link :to="`/profile/certification/form/${item.certification_id}`">
          {{ item.cert_name }}
        </nuxt-link>
      </template>
      <template #[`item.cert_date`]="{ item }">
        <span>{{ $dayjs(item.cert_date).format('D MMMM YYYY') }}</span>
      </template>
      <template #[`item.cert_expired`]="{ item }">
        <span>{{ $dayjs(item.cert_expired).format('D MMMM YYYY') }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  layout: 'profile_layout',
  data() {
    return {
      certification: [],
      headers: [
        { text: 'Nama sertifikasi', value: 'cert_name' },
        { text: 'Nomor sertifikat', value: 'certificate_no' },
        { text: 'Deskripsi', value: 'cert_desc' },
        { text: 'Tanggal sertifikasi', value: 'cert_date' },
        { text: 'Tanggal kadaluwarsa', value: 'cert_expired' },
      ],
    }
  },
  async fetch() {
    await this.getCertification()
  },
  head: {
    title: 'Sertifikasi'
  },
  methods: {
    async getCertification() {
      try {
        const response = await this.$axios.get('/profile/certification')
        this.certification = response.data
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>
