<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-icon class="mr-2">mdi-clipboard-text-clock-outline</v-icon>
        Riwayat lamaran
      </v-card-title>
      <v-divider />
      <loading-progress v-if="$fetchState.pending" />
      <v-data-table
        v-else
        :headers="headers"
        :items="histories"
        :items-per-page="5"
        class="elevation-1"
      >
        <template #[`item.applied_date`]="{ item }">
          {{ $dayjs(item.applied_date).format('dddd, D MMMM YYYY') }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'Perusahaan',
          align: 'start',
          sortable: false,
          value: 'company_name',
        },
        { text: 'Posisi', value: 'position_name' },
        { text: 'Tanggal lamaran', value: 'applied_date' },
        { text: 'Status', value: 'status_text' },
      ],
      histories: [],
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.get('/historyapply')
      this.histories = response.data
    } catch (error) {
      alert(error)
    }
  },
  head: {
    title: 'Riwayat lamaran',
  },
}
</script>
