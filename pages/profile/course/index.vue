<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-book-open-page-variant-outline</v-icon>
      Kursus
      <v-spacer />
      <v-btn color="primary" to="/profile/course/form/add">
        <v-icon class="mr-2">mdi-plus</v-icon>
        Tambah
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-data-table :headers="headers" :loading="loading" :items="courseList">
      <template #[`item.course_name`]="{ item }">
        <nuxt-link :to="`/profile/course/form/${item.appcourse_id}`">
          {{ item.course_name }}
        </nuxt-link>
      </template>
      <template #[`item.period`]="{ item }">
        {{ $dayjs(item.monthperiod_fr, 'M').format('MMMM') }}
        {{ item.period_fr }} -
        {{ $dayjs(item.monthperiod_to, 'M').format('MMMM') }}
        {{ item.period_to }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  layout: 'profile_layout',
  data() {
    return {
      loading: true,
      error: false,
      headers: [
        { text: 'Kursus', value: 'course_name' },
        { text: 'Institusi', value: 'course_institution' },
        { text: 'Periode', value: 'period' },
        { text: 'Kota', value: 'city' },
      ],
      courseList: [],
    }
  },
  async fetch() {
    await this.fetchCourse()
  },
  head: {
    title: 'Kursus',
  },
  methods: {
    async fetchCourse() {
      try {
        this.loading = true
        const response = await this.$axios.get('/profile/course')
        this.courseList = response.data
      } catch (error) {
        this.error = true
        alert(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
