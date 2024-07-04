<template>
  <v-card>
    <v-data-table
      :loading="$fetchState.pending"
      loading-text="Memuat data..."
      :headers="headers"
      :items="educationHistory"
    >
      <template #top>
        <v-card-title>
          <v-icon class="mr-2">mdi-school</v-icon>
          Riwayat pendidikan
          <v-spacer />
          <v-btn color="primary" to="/profile/education/form/add">
            <v-icon class="mr-2">mdi-plus</v-icon>
            Tambah
          </v-btn>
        </v-card-title>
        <!-- <v-toolbar flat>
          <v-toolbar-title>
            <v-icon class="mr-2">mdi-school</v-icon>
            Riwayat pendidikan
          </v-toolbar-title>
          <v-spacer />
          <v-btn color="primary" to="/profile/education/form/add">
            <v-icon class="mr-2">mdi-plus</v-icon>
            Tambah
          </v-btn>
        </v-toolbar> -->
        <v-divider></v-divider>
      </template>
      <template #[`item.edu_name`]="{ item }">
        <nuxt-link :to="`/profile/education/form/${item.appeducation_id}`">{{
          item.edu_name
        }}</nuxt-link>
      </template>
      <template #[`item.docpath`]="{ item }">
        <v-btn
          v-if="item.docpath"
          color="primary"
          small
          :href="`http://hris.bosowa.co.id/rest_api_jova/file/educationdocument?filename=${item.docpath}`"
          target="_blank"
        >
          Lihat file
        </v-btn>
        <span v-else>-</span>
      </template>
    </v-data-table>

    <!-- <v-card-title>
      <v-icon class="mr-2">mdi-school</v-icon>
      Riwayat pendidikan
    </v-card-title>
    <v-divider></v-divider>
    <v-toolbar dense class="mb-3" color="success" dark flat>
      <v-toolbar-title>Riwayat pendidikan</v-toolbar-title>
      <v-spacer />
      <v-btn
        color="primary"
        class="text-capitalize white"
        to="/profile/education/form/add"
        outlined
      >
        <v-icon small>mdi-plus</v-icon>
        Tambah
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="educationHistory"
      :items-per-page="5"
      class="elevation-1"
    >
      <template #[`item.docpath`]="{ item }">
        <v-btn
          v-if="item.docpath"
          x-small
          color="primary"
          :href="`https://hris.bosowa.co.id/bosowadev/sunfish5upload/selapplicant/education/${item.docpath}`"
        >
          Open file
        </v-btn>
        <span v-else>-</span>
      </template>
      <template #[`item.actions`]="{}">
        <v-btn x-small color="green" dark>Ubah</v-btn>
        <v-btn x-small color="red" dark>Hapus</v-btn>
      </template>
    </v-data-table> -->
  </v-card>
</template>

<script>
export default {
  layout: 'profile_layout',
  data() {
    return {
      headers: [
        { text: 'Institusi', value: 'edu_name' },
        { text: 'Jurusan', value: 'major' },
        { text: 'Tahun mulai', value: 'start_year' },
        { text: 'Tahun lulus', value: 'end_year' },
        { text: 'GPA', value: 'gpa' },
        { text: 'Ijazah / Transkrip nilai', value: 'docpath' },
        { text: '', value: 'actions', sortable: false },
      ],
      educationHistory: [],
    }
  },
  async fetch() {
    await this.getEducationHistory()
  },
  head: {
    title: 'Pendidikan'
  },
  methods: {
    async getEducationHistory() {
      const response = await this.$axios.get('/profile/education')
      this.educationHistory = response.data
    },
  },
}
</script>
