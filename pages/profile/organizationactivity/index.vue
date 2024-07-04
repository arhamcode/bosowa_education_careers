<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="organizationActivity"
      :loading="$fetchState.pending"
    >
      <template #top>
        <v-card-title>
          <v-icon class="mr-2">mdi-sitemap-outline</v-icon>
          Pengalaman organisasi
          <v-spacer></v-spacer>
          <v-btn color="primary" to="/profile/organizationactivity/form/add">
            <v-icon class="mr-2">mdi-plus</v-icon>
            Tambah
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
      </template>
      <template #[`item.org_name`]="{ item }">
        <nuxt-link
          :to="`/profile/organizationactivity/form/${item.apporgact_id}`"
        >
          {{ item.org_name }}
        </nuxt-link>
      </template>
      <template #[`item.period`]="{ item }">
        {{ item.start_year }} - {{ item.end_year }}
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
        { text: 'Organisasi', value: 'org_name' },
        { text: 'Jenis organisasi', value: 'org_type' },
        { text: 'Posisi', value: 'position' },
        { text: 'Deskripsi pekerjaan', value: 'position_desc' },
        { text: 'Periode', value: 'period' },
      ],
      organizationActivity: [],
    }
  },
  async fetch() {
    await this.getOrganizationActivity()
  },
  head: {
    title: 'Pengalaman organisasi',
  },
  methods: {
    async getOrganizationActivity() {
      const response = await this.$axios.get('/profile/organizationactivity')
      this.organizationActivity = response.data
    },
  },
}
</script>
