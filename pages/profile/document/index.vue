<template>
  <v-card>
    <v-data-table
      :loading="$fetchState.pending"
      :headers="headers"
      :items="documents"
    >
      <template #top>
        <v-card-title>
          <v-icon class="mr-2">mdi-text-box-multiple-outline</v-icon>
          Dokumen personal
          <v-spacer />
          <v-btn color="primary" to="/profile/document/form/add">
            <v-icon class="mr-2">mdi-plus</v-icon>
            Tambah
          </v-btn>
        </v-card-title>
        <v-divider />
      </template>
      <template #[`item.checklist_no`]="{ item }">
        <nuxt-link :to="`/profile/document/form/${item.checklist_no}`">
          {{
            $store.getters['masterType/documentType'].find(
              (element) => element.id === item.checklist_no
            ).name
          }}
        </nuxt-link>
      </template>
      <template #[`item.file_name`]="{ item }">
        <v-btn
          v-if="item.file_name"
          color="primary"
          small
          :href="`http://hris.bosowa.co.id/rest_api_jova/file/document?filename=${item.file_name}`"
          target="_blank"
        >
          Lihat file
        </v-btn>
        <span v-else>-</span>
      </template>
      <template #[`item.document_date`]="{ item }">
        {{ $dayjs(item.document_date).format('D MMMM YYYY') }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  layout: 'profile_layout',
  data() {
    return {
      documents: [],
      headers: [
        { text: 'Jenis dokumen', value: 'checklist_no' },
        { text: 'File', value: 'file_name' },
        { text: 'Tanggal dokumen', value: 'document_date' },
        { text: 'Deskripsi', value: 'document_remark' },
      ],
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchDocumentType')
    await this.getPersonalDocument()
  },
  head: {
    title: 'Dokumen personal'
  },
  methods: {
    async getPersonalDocument() {
      const response = await this.$axios.get('/profile/document')
      this.documents = response.data
    },
  },
}
</script>
