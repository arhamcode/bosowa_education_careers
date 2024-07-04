<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template #activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-icon>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Keluar</v-list-item-title>
      </v-list-item>
      <!-- <v-btn v-bind="attrs" text v-on="on">
        <v-icon class="mr-2">mdi-logout-variant</v-icon>
        Keluar
      </v-btn> -->
    </template>
    <v-card>
      <v-card-title class="text-h5">
        <v-icon class="mr-2">mdi-logout-variant</v-icon>
        Keluar
      </v-card-title>
      <v-card-text>Akhiri sesi login ?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="dialog = false">
          <v-icon class="mr-2">mdi-close</v-icon>
          Batal
        </v-btn>
        <v-btn color="green darken-1" text @click="logout">
          <v-icon class="mr-2">mdi-check</v-icon>
          Ya
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    async logout() {
      this.dialog = false
      await this.$auth.logout()
      location.reload()
    },
  },
}
</script>
