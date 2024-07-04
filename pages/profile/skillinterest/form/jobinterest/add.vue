<template>
  <v-card>
    <v-card-title>Tambah pekerjaan yang diminati</v-card-title>
    <v-divider />
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Pekerjaan yang diminati"
            vid="jobinterest_code"
            rules="required"
          >
            <v-select
              v-model="jobinterest.jobinterest_code"
              :items="$store.getters['masterType/jobInterest']"
              :error-messages="errors"
              item-text="name"
              item-value="id"
              outlined
              dense
            >
              <template #label>
                Pekerjaan yang diminati <span class="red--text">*</span>
              </template>
            </v-select>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Rating"
            vid="rating_code"
            rules="required"
          >
            <v-select
              v-model="jobinterest.rating_code"
              :error-messages="errors"
              label="Rating"
              item-text="name"
              item-value="id"
              dense
              outlined
              :items="$store.getters['masterType/skillLevel']"
            >
              <template #label>
                Rating <span class="red--text">*</span>
              </template>
            </v-select>
          </validation-provider>

          <v-btn :loading="loading" color="primary" type="submit">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
          <v-btn color="success" dark @click="$router.back()">Kembali</v-btn>
        </form>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script>
import { required } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'Mohon isi {_field_}.',
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
      jobinterest: {},
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchJobInterest')
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          await this.$axios.post('/skillinterest/jobinterest', this.jobinterest)
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
