<template>
  <v-card>
    <v-card-title>Ubah minat</v-card-title>
    <v-divider />
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <v-text-field
            dense
            outlined
            :value="interest.items.interest_name"
            readonly
          ></v-text-field>
          <validation-provider
            v-slot="{ errors }"
            name="Rating"
            vid="rating_code"
            rules="required"
          >
            <v-select
              v-model="interest.items.rating_code"
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
          <v-btn color="red" dark @click="deleteInterest">
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
      interest: {},
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchInterest')
    await this.fetchInterest()
  },
  methods: {
    async fetchInterest() {
      const response = await this.$axios.get(
        '/skillinterest/interest?interest_code=' + this.$route.params.edit
      )
      this.interest = response.data
    },
    async deleteInterest() {
      if (confirm('Hapus ' + this.interest.items.interest_name) === true) {
        try {
          await this.$axios.delete(
            '/skillinterest/interest?interest_code=' +
              this.interest.items.interest_code
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
          await this.$axios.put('/skillinterest/interest', this.interest.items)
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
