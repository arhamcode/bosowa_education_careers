<template>
  <v-card>
    <!-- <v-dialog
      v-if="deleteItem"
      v-model="deleteDialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5">Hapus</v-card-title>
        <v-card-text>
          Anda akan menghapus {{ deleteItem.apprelasi_name }} -
          {{ deleteItem.app_relation }} ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Batal
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteRelation(deleteItem.apprelasi_id)"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <v-data-table
      :loading="$fetchState.pending"
      loading-text="Memuat data..."
      :headers="headers"
      :items="relations"
    >
      <template #top>
        <v-card-title>
          <v-icon class="mr-2">mdi-relation-one-to-many</v-icon>
          Relasi
          <v-spacer />
          <v-btn color="primary" to="/profile/relation/form/add">
            <v-icon class="mr-2">mdi-plus</v-icon>
            Tambah
          </v-btn>
        </v-card-title>
        <!-- <v-toolbar flat>
          <v-toolbar-title>
            <v-icon class="mr-2">mdi-relation-one-to-many</v-icon>
            Relasi
          </v-toolbar-title>
          <v-spacer />
          <v-btn color="primary" to="/profile/relation/form/add">
            <v-icon class="mr-2">mdi-plus</v-icon>
            Tambah
          </v-btn>
        </v-toolbar> -->
        <v-divider></v-divider>
      </template>
      <template #[`item.apprelasi_name`]="{ item }">
        <nuxt-link :to="`/profile/relation/form/${item.apprelasi_id}`">{{
          item.apprelasi_name
        }}</nuxt-link>
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
        { text: 'Nama', value: 'apprelasi_name' },
        { text: 'Alamat', value: 'apprelasi_address' },
        { text: 'Nomor telepon', value: 'telepon' },
        { text: 'Hubungan', value: 'app_relation' },
        { text: 'Email', value: 'email' },
      ],
      relations: [],
    }
  },
  async fetch() {
    await this.getRelations()
  },
  head: {
    title: 'Relasi',
  },
  methods: {
    async getRelations() {
      const response = await this.$axios.get('/profile/relation')
      this.relations = response.data
    },
    // async deleteRelation(id) {
    //   await this.$axios.delete(`/profile/relation?id=${id}`)
    //   this.deleteDialog = false
    //   this.getRelations()
    // },
    // setDeleteItem(item) {
    //   this.deleteItem = item
    //   this.deleteDialog = true
    // },
  },
}
</script>
