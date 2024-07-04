<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-relation-one-to-many</v-icon>
      Ubah relasi
    </v-card-title>
    <v-divider />
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Nama lengkap"
            vid="apprelasi_name"
            rules="required"
          >
            <v-text-field
              v-model="relation.apprelasi_name"
              :error-messages="errors"
              label="Nama"
              dense
              outlined
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Hubungan"
            vid="app_relation"
            rules="required"
          >
            <v-text-field
              v-model="relation.app_relation"
              label="Hubungan"
              :error-messages="errors"
              dense
              outlined
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Email"
            vid="email"
            rules="email"
          >
            <v-text-field
              v-model="relation.email"
              label="Email"
              :error-messages="errors"
              dense
              outlined
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Telepon"
            vid="telepon"
            rules="required|phone_numeric"
          >
            <v-text-field
              v-model="relation.telepon"
              label="Nomor telepon"
              type="number"
              :error-messages="errors"
              dense
              outlined
            ></v-text-field>
          </validation-provider>
          <v-textarea
            v-model="relation.apprelasi_address"
            label="Alamat"
            dense
            rows="2"
            outlined
          ></v-textarea>

          <v-btn :loading="loading" type="submit" color="primary">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
          <v-btn dark color="red" @click="deleteRelation">
            <v-icon class="mr-2">mdi-delete</v-icon>
            Hapus
          </v-btn>
          <v-btn class="success" @click="$router.back()"> Kembali </v-btn>
        </form>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script>
import { required, email, numeric } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} harus diisi.',
})

extend('email', {
  ...email,
  message: 'Alamat email tidak valid.',
})

extend('phone_numeric', {
  ...numeric,
  message: 'Nomor telepon hanya dapat diisi dengan karakter angka/numerik.',
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'profile_layout',
  data() {
    return {
      loading: false,
      relation: {
        apprelasi_name: '',
        app_relation: '',
        telepon: '',
        apprelasi_address: '',
        email: '',
      },
    }
  },
  async fetch() {
    await this.getRelation()
  },
  methods: {
    async getRelation() {
      const response = await this.$axios.get(
        '/profile/relation?id=' + this.$route.params.edit
      )
      this.relation = response.data
    },
    async deleteRelation() {
      if (confirm(`Hapus data ${this.relation.apprelasi_name}`) === true) {
        await this.$axios.delete(
          '/profile/relation?id=' + this.$route.params.edit
        )
        this.$router.back()
      }
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          await this.$axios.put('/profile/relation', this.relation)
          this.$router.back()
        } catch (error) {
          alert(error)
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>
