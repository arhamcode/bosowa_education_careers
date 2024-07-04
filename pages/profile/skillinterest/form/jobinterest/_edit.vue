<template>
  <v-card>
    <v-card-title>Ubah pekerjaan yang diminati</v-card-title>
    <v-divider />
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <v-text-field
            dense
            outlined
            :value="jobinterest.items.jobinterest_name"
            readonly
          ></v-text-field>
          <validation-provider
            v-slot="{ errors }"
            name="Rating"
            vid="rating_code"
            rules="required"
          >
            <v-select
              v-model="jobinterest.items.rating_code"
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
          <v-btn color="red" dark @click="deleteJobInterest">
            <v-icon class="mr-2">mdi-delete</v-icon>
            Hapus
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
    await this.fetchJobInterest()
  },
  methods: {
    async fetchJobInterest() {
      const response = await this.$axios.get(
        '/skillinterest/jobinterest?jobinterest_code=' + this.$route.params.edit
      )
      this.jobinterest = response.data
    },
    async deleteJobInterest() {
      if (
        confirm('Hapus ' + this.jobinterest.items.jobinterest_name) === true
      ) {
        try {
          await this.$axios.delete(
            '/skillinterest/jobinterest?jobinterest_code=' +
              this.jobinterest.items.jobinterest_code
          )
          this.$router.back()
        } catch (error) {
          alert(error)
        }
      }
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          await this.$axios.put(
            '/skillinterest/jobinterest',
            this.jobinterest.items
          )
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
