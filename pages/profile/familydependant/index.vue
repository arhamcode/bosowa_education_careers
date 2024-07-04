<template>
  <v-card>
    <v-data-table
      :loading="$fetchState.pending"
      loading-text="Memuat data..."
      :headers="headers"
      :items="familyDependants"
    >
      <template #top>
        <v-card-title>
          <v-icon class="mr-2">mdi-human-male-female-child</v-icon>
          Keluarga &amp; tanggungan
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="text-capitalize white"
            to="/profile/familydependant/form/add"
          >
            <v-icon class="mr-2">mdi-plus</v-icon>
            Tambah
          </v-btn>
        </v-card-title>
        <v-alert dense type="info">
          Optional: Upload salinan kartu keluarga
          <v-btn dark outlined small to="/profile/document">disini</v-btn>
        </v-alert>
        <v-divider />
      </template>
      <template #[`item.appfamily_name`]="{ item }">
        <nuxt-link :to="`/profile/familydependant/form/${item.appfamily_id}`">{{
          item.appfamily_name
        }}</nuxt-link>
      </template>
      <template #[`item.appfamily_dob`]="{ item }">
        <span>{{ $dayjs(item.appfamily_dob).format('D MMMM YYYY') }}</span>
      </template>
      <template #[`item.appfamily_dependentsts`]="{ item }">
        <span>{{ item.appfamily_dependentsts ? 'Ya' : 'Tidak' }}</span>
      </template>
      <template #[`item.alive_status`]="{ item }">
        <span>{{ item.alive_status ? 'Hidup' : 'Meninggal dunia' }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  layout: 'profile_layout',
  data() {
    return {
      headers: [
        { text: 'Nama', value: 'appfamily_name' },
        { text: 'Hubungan', value: 'relationship' },
        { text: 'Tempat lahir', value: 'appfamily_birthplace' },
        { text: 'Tanggal lahir', value: 'appfamily_dob' },
        { text: 'Tanggungan', value: 'appfamily_dependentsts' },
        { text: 'Pekerjaan', value: 'occupation' },
        { text: 'Status', value: 'alive_status' },
      ],
      familyDependants: [],
    }
  },
  async fetch() {
    await this.getFamilyDependants()
  },
  head: {
    title: 'Keluarga & tanggungan',
  },
  methods: {
    async getFamilyDependants() {
      const response = await this.$axios.get('/profile/family')
      this.familyDependants = response.data
    },
  },
}
</script>
