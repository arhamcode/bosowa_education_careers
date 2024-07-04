<template>
  <v-card>
    <v-data-table :headers="headers" :items="psychology">
      <template #top>
        <v-card-title>
          <v-icon class="mr-2">mdi-head-cog-outline</v-icon>
          Tes psikologi
          <v-spacer />
          <v-btn color="primary" to="/profile/psychology/form/add">
            <v-icon class="mr-2">mdi-plus</v-icon>
            Tambah
          </v-btn>
        </v-card-title>
        <v-divider />
      </template>
      <template #[`item.test_date`]="{ item }">
        <span>{{ $dayjs(item.test_date).format('D MMMM YYYY') }}</span>
      </template>
      <template #[`item.test_subject`]="{ item }">
        <nuxt-link :to="`/profile/psychology/form/${item.psychology_id}`">{{
          item.test_subject
        }}</nuxt-link>
      </template>
      <template #[`item.test_cost`]="{ item }">
        IDR {{ item.test_cost }}
      </template>
      <template #[`item.test_score`]="{ item }">
        {{ item.test_score }} [{{ item.scorerange_min }} -
        {{ item.scorerange_max }}]
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
        {
          text: 'Subjek',
          value: 'test_subject',
        },
        {
          text: 'Tanggal',
          value: 'test_date',
        },
        {
          text: 'Institusi',
          value: 'test_institution',
        },
        {
          text: 'Biaya',
          value: 'test_cost',
        },
        {
          text: 'Skor',
          value: 'test_score',
        },
        {
          text: 'Hasil',
          value: 'test_result',
        },
      ],
      psychology: [],
    }
  },
  async fetch() {
    await this.getPsychology()
  },
  head: {
    title: 'Tes psikologi'
  },
  methods: {
    async getPsychology() {
      const response = await this.$axios.get('/profile/psychology')
      this.psychology = response.data
    },
  },
}
</script>
