<template>
  <v-card>
    <v-data-table
      :loading="$fetchState.pending"
      :headers="headers"
      :items="jobExperience"
    >
      <template #top>
        <v-card-title>
          <v-icon class="mr-2">mdi-account-hard-hat</v-icon>
          Pengalaman kerja
          <v-spacer />
          <v-btn color="primary" to="/profile/jobexperience/form/add">
            <v-icon class="mr-2">mdi-plus</v-icon>
            Tambah
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
      </template>
      <template #[`item.company_name`]="{ item }">
        <nuxt-link :to="`/profile/jobexperience/form/${item.appjobexp_id}`">{{
          item.company_name
        }}</nuxt-link>
      </template>
      <template #[`item.period`]="{ item }">
        {{ $dayjs(item.start_month, 'M').format('MMMM') }}
        {{ item.start_year }} -
        {{ $dayjs(item.end_month, 'M').format('MMMM') }}
        {{ item.end_year }}
      </template>
      <template #[`item.last_salary`]="{ item }">
        IDR {{ item.last_salary }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  layout: 'profile_layout',
  data() {
    return {
      jobExperience: [],
      headers: [
        { text: 'Nama perusahaan', value: 'company_name' },
        { text: 'Alamat', value: 'company_addr' },
        { text: 'Posisi', value: 'job_position' },
        { text: 'Gaji terakhir', value: 'last_salary' },
        { text: 'Periode', value: 'period' },
      ],
    }
  },
  async fetch() {
    await this.getJobExperience()
  },
  head: {
    title: 'Pengalaman kerja',
  },
  methods: {
    async getJobExperience() {
      const response = await this.$axios.get('/profile/jobexperience')
      this.jobExperience = response.data
    },
  },
}
</script>
